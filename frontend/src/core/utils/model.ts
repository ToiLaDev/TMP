import { pick, uniqueId, isEqual } from './index'

export class ArrayModel<T extends BaseModel> extends Array<T | Partial<T>> {
  private readonly _model: any
  constructor(model: new () => T, ...args: any[]) {
    super()
    this._model = model
    if (args.length > 0) {
      this.setData(args)
    }

    return new Proxy(this, {
      get(target: any, prop) {
        return target[prop]
      },
      set(target, prop, value) {
        if (value && value instanceof Object) {
          target[prop] = target._model.cast(value)
        } else {
          target[prop] = value
        }
        return true
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => !key.startsWith('_'))
      }
    })
  }

  setData(list: Array<any>) {
    if (this.length > 0) {
      this.length = 0
    }
    if (list.length === 1 && list[0] instanceof Array) {
      list = list[0]
    }
    list.forEach((val: any) => {
      this.push(this._model.cast(val))
    })
  }

  map(callback: (value: T | Partial<T>, index: number, array: (T | Partial<T>)[]) => any, thisArg?: any): any {
    const isRefCall = /^[(]*([a-zA-Z0-9]+)[)]*\s*=>\s*([a-zA-Z0-9]+)\(\1\)\s*\?\s*([a-zA-Z0-9]+)\(\1\)\s*:\s*([a-zA-Z0-9]+)$/.test(callback.toString())
    if (isRefCall) {
      return new ArrayModel(this._model, ...super.map(callback, thisArg))
    }
    return [...super.map(callback, thisArg)]
  }

  concat(...items: any): ArrayModel<T> {
    return new ArrayModel(this._model, ...super.concat(...items))
  }
}

export abstract class BaseModel {
  [key: string]: any
  created_at?: string
  updated_at?: string
  deleted_at?: string

  _localId: string = ''

  constructor(obj?: Partial<BaseModel>) {
    this._localId = uniqueId('local_')
    if (obj) {
      this.setData(obj)
    }

    return new Proxy(this, {
      get(target: any, prop) {
        return target[prop]
      },
      set(target, prop, value) {
        target[prop] = value
        return true
      },
      ownKeys(target) {
        return Object.keys(target).filter((key) => (!target._hidden || !target._hidden.includes(key)) && !key.startsWith('_'))
      }
    })
  }

  setData(obj: Record<string, any>) {
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(this, key)) continue

      const value = obj[key]
      const currentValue = this[key]

      if (currentValue instanceof BaseModel) {
        this[key] = currentValue.cast(value)
      } else if (currentValue instanceof ArrayModel) {
        currentValue.setData(value)
      } else {
        this[key] = value
      }
    }

    if (obj.id) {
      this._localId = 'remote_' + obj.id
    } else if (obj._localId) {
      this._localId = obj._localId
    }
  }

  toObject() {
    const propertyNames: string[] = Object.getOwnPropertyNames(this).filter((key) => !key.startsWith('_'))
    return pick(this, propertyNames)
  }

  isEqual<T extends BaseModel>(model: T): boolean {
    return isEqual(this.toObject(), model.toObject())
  }

  static cast<T extends BaseModel>(this: new () => T, obj: Partial<T>): T {
    const instance = new this()
    instance.setData(obj)
    return instance
  }

  cast<T extends BaseModel>(obj: Partial<T>): T {
    // @ts-ignore
    return (this.constructor as new () => T).cast(obj)
  }

  static multiCast<T extends BaseModel>(this: new () => T, ...objs: Partial<T>[]): ArrayModel<T> {
    return new ArrayModel<T>(this, ...objs)
  }

  multiCast<T extends BaseModel>(...obj: Partial<T>[]): ArrayModel<T> {
    // @ts-ignore
    return (this.constructor as new () => T).multiCast(...obj)
  }

  clone<T extends BaseModel>(): T {
    // @ts-ignore
    return (this.constructor as new () => T).cast(this.toObject())
  }
}
