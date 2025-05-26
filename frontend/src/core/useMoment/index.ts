import moment from 'moment/min/moment-with-locales'
import type { Plugin, App } from 'vue'

const momentPlugin: Plugin = {
  install(app: App, options: any = undefined) {
    const momentInstance = options && options.moment ? options.moment : moment

    app.config.globalProperties.$moment = momentInstance

    app.provide('moment', momentInstance)
  }
}

export default momentPlugin

export { moment }
