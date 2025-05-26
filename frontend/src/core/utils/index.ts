export * from './types'
export * from './model'
export * from './lifeCycle'
export * from './string'
export * from './object'

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const download = async (url: string, name: string) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = url
  link.target = '_blank'
  link.download = (name || url.split(/[\\/]/).pop()) as string
  document.body.appendChild(link)
  link.click()
  await sleep(100)
  link.remove()
}

export const downloadBlob = async (data: any, name: string, type: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') => {
  const blob = new Blob([data], { type })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = name

  document.body.appendChild(link)

  link.click()

  await new Promise((resolve) => setTimeout(resolve, 100))

  document.body.removeChild(link)

  window.URL.revokeObjectURL(url)
}

export const downloadBase64 = async (base64Data: string, name: string, type: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') => {
  const binaryString = window.atob(base64Data)
  const len = binaryString.length
  const bytes = new Uint8Array(len)

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  await downloadBlob(bytes, name, type)
}

export const toQueryString = (obj: any, prefix?: string): string => {
  return Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== null)
    .map((key) => {
      const prefixedKey = prefix ? `${prefix}[${encodeURIComponent(key)}]` : encodeURIComponent(key)
      const value = obj[key]

      if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
        return toQueryString(value, prefixedKey)
      } else {
        return `${prefixedKey}=${encodeURIComponent(String(value))}`
      }
    })
    .join('&')
}

export const numberSeparator = (locale?: string): { thousandSeparator: string; decimalSeparator: string } => {
  const number = 1000.1
  const separators = new Intl.NumberFormat(locale || navigator.language).format(number).replace(/\d/g, '')
  const thousandSeparator = separators[0]
  const decimalSeparator = separators[1]
  return { thousandSeparator, decimalSeparator }
}

export const formatNumber = (number: number, locale?: string): string => {
  const { thousandSeparator, decimalSeparator } = numberSeparator(locale)
  const [integerPart, fractionalPart] = String(number)
    .replace(new RegExp(thousandSeparator === ',' ? ',' : '\\.', 'g'), '')
    .split(decimalSeparator)
  const formattedIntegerPart = new Intl.NumberFormat(locale || navigator.language).format(Number(integerPart))
  return fractionalPart ? `${formattedIntegerPart}${decimalSeparator}${fractionalPart}` : formattedIntegerPart
}

export const isNumber = (value: any): boolean => {
  return !isNaN(parseFloat(value)) && isFinite(value)
}

export const sha1 = async (input: string) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)

  const hashBuffer = await crypto.subtle.digest('SHA-1', data)

  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export const isEqual = (value: any, other: any): boolean => {
  if (value === other) return true

  if (typeof value !== 'object' || value === null || typeof other !== 'object' || other === null) {
    return false
  }

  const keysA = Object.keys(value) as Array<keyof typeof value>
  const keysB = Object.keys(other) as Array<keyof typeof other>

  if (keysA.length !== keysB.length) return false

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(value[key], other[key])) {
      return false
    }
  }

  return true
}

let idCounter = 0
export const uniqueId = (prefix = ''): string => {
  idCounter += 1
  return `${prefix}${idCounter}`
}

export const noop = () => {}

export const isClient = typeof window !== 'undefined' && typeof document !== 'undefined'

export const isIOS = getIsIOS()

function getIsIOS() {
  return (
    isClient && window?.navigator?.userAgent && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || (window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent)))
  )
}
