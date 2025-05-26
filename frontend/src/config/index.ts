interface AppConfig {
  BASE_URL: string
  BASE_API_URL: string
  I18N_HASH: string
  IS_DEV: boolean
  IS_PROD: boolean
}

const isDev = import.meta.env.DEV

export const config: AppConfig = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  BASE_API_URL: import.meta.env.VITE_BASE_API_URL,
  I18N_HASH: import.meta.env.VITE_I18N_HASH,
  IS_DEV: isDev,
  IS_PROD: !isDev
}
