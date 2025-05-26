import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice'
import App from '@/app/App.vue'
import i18n from '@/core/useI18n'
import autoLoadRoute from '@/app/router'
import pinia from '@/core/usePinia'
import ThemeOptions from '@/config/theme'
import '@/assets/scss/app.scss'
import { useInterfaceStore } from '@/app/store/interface'
import moment from '@/core/useMoment'

const AppInit = async () => {
  const app = createApp(App)
  // Autoload Route
  const router = await autoLoadRoute()
  app.use(pinia)
  app.use(i18n)
  app.use(moment)
  app.use(PrimeVue, ThemeOptions)
  app.use(ConfirmationService)
  app.use(DialogService)
  app.use(ToastService)
  app.use(router)

  const IFS = useInterfaceStore()
  await IFS.init()

  app.mount('#app')
}
;(async function () {
  await AppInit()
})()
