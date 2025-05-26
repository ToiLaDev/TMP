<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import Popover from 'primevue/popover'
import { useInterfaceStore } from '@/app/store/interface'
import { computed, ref } from 'vue'
import AppLeftSidebar from '@/app/components/panel/LeftSidebar.vue'
import { useAuthStore } from '@/app/store/auth'
import { ELeftSidebarState, KEY_FETCH_API_ERROR } from '@/app/constants/key'
import { LANG_SHOW } from '@/app/constants/app'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { useRouter } from 'vue-router'
import { useEventBus } from '@/core/useEventBus'
import { useI18n } from '@/core/useI18n'
import '@/assets/scss/sidebar.scss'

const IFS = useInterfaceStore()
const AUTH = useAuthStore()
const router = useRouter()
const toast = useToast()
const confirm = useConfirm()
const { t } = useI18n()
const { on: onFetchApiError } = useEventBus(KEY_FETCH_API_ERROR)

const containerElm = ref<HTMLElement | null>(null)

const sidebarMouseenter = () => {
  if (IFS.leftSidebar == ELeftSidebarState.Mini && containerElm.value) {
    containerElm.value.classList.add('sidebar-active')
  }
}

const sidebarMouseleave = () => {
  if (IFS.leftSidebar == ELeftSidebarState.Mini && containerElm.value) {
    containerElm.value.classList.remove('sidebar-active')
  }
}

const menuProfile = ref()
const menuNotification = ref()
const menuLanguage = ref()
const menuProfileItems = computed(() => [
  {
    separator: true
  },
  {
    label: 'navigation.profile',
    items: [
      {
        label: 'navigation.settings',
        icon: 'app-icon icon-gear',
        command: () => {
          userSettingHandle()
        }
      },
      {
        label: 'navigation.messages',
        icon: 'app-icon icon-inbox',
        badge: 2
      },
      {
        separator: true
      },
      {
        label: 'buttons.sign_out',
        icon: 'app-icon icon-right-from-bracket',
        command: () => {
          logoutHandle()
        }
      }
    ]
  }
])
const menuLanguageItems = ref([
  {
    separator: true
  },
  ...Object.entries(LANG_SHOW).map(([code, label]) => ({
    label,
    icon: code,
    command: () => {
      IFS.setLocale(code)
      menuLanguage.value.toggle()
    }
  }))
])

const logoutHandle = () => {
  confirm.require({
    message: t('dialogs.logout.message'),
    header: t('dialogs.logout.title'),
    icon: 'app-icon icon-triangle-exclamation warning-color',
    rejectProps: {
      label: t('buttons.cancel'),
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: t('buttons.sign_out'),
      severity: 'warn'
    },
    defaultFocus: 'accept',
    accept: async () => {
      await AUTH.logout()
      router.push({ name: 'login' })
    }
  })
}

const modeHandle = () => {
  IFS.toggleDarkMode()
}

const userSettingHandle = () => {
  toast.add({ severity: 'success', summary: 'Success', detail: 'userSettingHandle' })
}

onFetchApiError(({ error, context }: any) => {
  toast.add({ severity: 'error', summary: 'Error', detail: error.message })
})

</script>

<template>
  <Toast />
  <ConfirmDialog />
  <div
    ref="containerElm"
    class="flex relative lg:static h-screen overflow-hidden"
    :class="{
      'sidebar-mini': IFS.leftSidebar == ELeftSidebarState.Mini,
      'sidebar-full sidebar-active': IFS.leftSidebar == ELeftSidebarState.Full,
      'sidebar-hide': IFS.leftSidebar == ELeftSidebarState.Hide
    }"
  >
    <AppLeftSidebar
      ref="sidebarElm"
      @mouseenter="sidebarMouseenter"
      @mouseleave="sidebarMouseleave"
      @logout="logoutHandle"
    />
    <div id="app-content">
      <Toolbar class="border-0 rounded-lg shadow-sm pl-1 pr-4 py-1 mb-4">
        <template #start>
          <Breadcrumb
            :home="{ icon: 'app-icon icon-house', route: '/' }"
            :model="IFS.breadcrumbs"
          />
        </template>
        <template #center>
          <div class="p-search">
            <IconField
              iconPosition="left"
              class="w-full"
            >
              <InputIcon class="app-icon icon-magnifying-glass" />
              <InputText
                placeholder="Search menus, shortcuts, contact and more..."
                type="text"
                class="w-full border-0 shadow-none outline-0"
              />
            </IconField>
            <span class="p-shortcut me-2">⌘+K</span>
          </div>
        </template>
        <template #end>
          <div class="flex items-center gap-2">
            <Avatar
              :image="`/assets/images/flags/1x1/${IFS.locale}.svg`"
              shape="circle"
              class="cursor-pointer"
              @click="menuLanguage.toggle($event)"
            />
            <Avatar
              :icon="IFS.darkMode ? 'app-icon icon-moon' : 'app-icon icon-sun'"
              shape="circle"
              class="cursor-pointer"
              @click="modeHandle"
            />
            <Avatar
              icon="app-icon icon-bell"
              shape="circle"
              class="cursor-pointer"
              @click="menuNotification.toggle($event)"
            />
            <Avatar
              :label="AUTH.user?.avatar ? '' : AUTH.user?.label"
              :image="AUTH.user?.avatar"
              shape="circle"
              class="cursor-pointer"
              @click="menuProfile.toggle($event)"
            />
            <Popover ref="menuProfile">
              <Menu
                :model="menuProfileItems"
                class="border-0"
              >
                <template #start>
                  <span class="inline-flex items-center gap-1 px-2 py-2">
                    <Avatar
                      :label="AUTH.user?.avatar ? '' : AUTH.user?.label"
                      :image="AUTH.user?.avatar"
                      class="mr-2"
                      shape="circle"
                    />
                    <span class="inline-flex flex-col">
                      <span class="font-bold">{{ AUTH.user?.name }}</span>
                      <span class="text-sm">Admin</span>
                    </span>
                  </span>
                </template>
                <template #submenuheader="{ item }">
                  <span class="text-primary font-bold">{{ $t(item.label as string) }}</span>
                </template>
                <template #item="{ item, props }">
                  <a
                    class="flex items-center"
                    v-bind="props.action"
                  >
                    <span :class="item.icon" />
                    <span class="ml-2">{{ $t(item.label as string) }}</span>
                    <Badge
                      v-if="item.badge"
                      class="ml-auto"
                      :value="item.badge"
                    />
                    <span
                      v-if="item.shortcut"
                      class="p-shortcut"
                      >{{ item.shortcut }}</span
                    >
                  </a>
                </template>
              </Menu>
            </Popover>
            <Popover ref="menuLanguage">
              <Menu
                :model="menuLanguageItems"
                class="border-0"
              >
                <template #start>
                  <span class="inline-flex items-center gap-1 px-2 py-2 text-primary font-bold">{{ $t('navigation.languages') }}</span>
                </template>
                <template #item="{ item, props }">
                  <a v-bind="props.action">
                    <img
                      class="h-6"
                      :src="`/assets/images/flags/4x3/${item.icon}.svg`"
                      :alt="item.label as string"
                    />
                    <span>{{ item.label }}</span>
                  </a>
                </template>
              </Menu>
            </Popover>
          </div>
        </template>
      </Toolbar>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
