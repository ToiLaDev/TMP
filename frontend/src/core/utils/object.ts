export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const entries = Object.entries(obj).filter(([key]) => !keys.includes(key as K))
  return Object.fromEntries(entries) as Omit<T, K>
}

export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce(
    (result, key) => {
      if (key in obj) {
        result[key] = obj[key]
      }
      return result
    },
    {} as Pick<T, K>
  )
}

export const isObject = (val: any): val is object => Object.prototype.toString.call(val) === '[object Object]'
