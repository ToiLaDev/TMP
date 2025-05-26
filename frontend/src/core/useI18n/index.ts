import { createI18n } from 'vue-i18n'
import { KEY_LANG_NAME } from '@/app/constants/key'
import { LANG_DEFAULT } from '@/app/constants/app'
import { startCase } from '@/core/utils'
import { config } from '@/config'
import messages from '@intlify/unplugin-vue-i18n/messages'

export * from 'vue-i18n'

const loadLocale = async (locale: string) => {
  if (config.IS_DEV) {
    return new Promise((resolve) => {
      const modules = import.meta.glob('/**/*.locale.json')
      if (Object.keys(modules).length === 0) {
        resolve({})
        return
      }
      const promises: any = []
      for (const path in modules) {
        const matched = path.match(/([A-Za-z0-9-_]+)\./gi)
        if (matched && matched.length > 1 && locale == matched[0].replace('.', '')) {
          promises.push(modules[path]())
        }
      }
      Promise.all(promises).then((values) => {
        resolve(
          values.reduce((acc, cur) => {
            return { ...acc, ...cur.default }
          }, {})
        )
      })
    })
  } else {
    return fetch(`/locales/${locale}.json?${config.I18N_HASH}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
        throw new Error('Something went wrong!')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}

const i18n = createI18n({
  locale: localStorage.getItem(KEY_LANG_NAME) || LANG_DEFAULT,
  // fallbackLocale: LANG_DEFAULT,
  messages,
  legacy: false,
  globalInjection: true,
  missing: (locale, key) => {
    if (!config.IS_DEV) {
      return startCase(key.split('.').pop())
    } else {
      console.warn(`Missing translation key: ${key} for language: ${locale}.`)
    }
  }
})

export async function setLocale(locale: string) {
  // Load locale if not available yet.
  if (!i18n.global.availableLocales.includes(locale)) {
    const messages = await loadLocale(locale)

    if (messages === undefined) {
      return
    }

    i18n.global.setLocaleMessage(locale, messages)
  }

  i18n.global.locale.value = locale
}

export default i18n
