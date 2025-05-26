<script setup lang="ts">
import { useInterfaceStore } from '@/app/store/interface'
import { ELeftSidebarState } from '@/app/constants/key'
import { useRouter } from 'vue-router'
import { UseScrollbar } from '@/core/useScrollbar/component'

const IFS = useInterfaceStore()
const router = useRouter()

IFS.setMenus([
  { label: 'Dashboard', icon: 'app-icon icon-gauge', route: '/' },
  { separator: true, label: 'Label' }
])

</script>

<template>
  <div id="app-sidebar">
    <div class="sidebar-header">
      <span class="inline-flex items-center gap-1">
        <img
          src="/assets/images/logo.svg"
          alt="Image"
          class="brand-logo"
        />
        <span class="font-semibold text-xl app-name">{{ $t('app.name') }}</span>
      </span>
      <Button
        class="menu-toggle"
        :class="{ 'rotate-180': IFS.leftSidebar == ELeftSidebarState.Mini }"
        icon="app-icon icon-chevron-left"
        rounded
        @click="IFS.toggleSidebar()"
      />
    </div>
    <UseScrollbar :offset="5">
      <PanelMenu :model="IFS.getMenus">
        <template #item="{ item, hasSubmenu, active }">
          <router-link
            v-if="item.route"
            v-slot="{ href, navigate }"
            :to="item.route"
            custom
          >
            <a
              :class="['p-panelmenu-header-link flex', item.class]"
              :href="href"
              :id="item.id"
              @click="navigate"
            >
              <span :class="item.icon" />
              <span class="p-panelmenu-header-label flex-1">{{ item.label }}</span>
              <Badge
                v-if="item.badge"
                :value="item.badge"
              />
              <span
                v-if="item.shortcut"
                class="border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                >{{ item.shortcut }}</span
              >
            </a>
          </router-link>
          <span
            v-else-if="item.separator"
            class="menu-header uppercase text-xs text-muted-color font-semibold ms-3.5"
            >{{ item.label }}</span
          >
          <a
            v-else
            :class="['p-panelmenu-header-link flex', item.class]"
            :id="item.id"
            :href="item.url"
            :target="item.target"
          >
            <span :class="item.icon" />
            <span class="p-panelmenu-header-label flex-1">{{ item.label }}</span>
            <Badge
              v-if="item.badge"
              :value="item.badge"
            />
            <span
              v-if="hasSubmenu"
              :class="[
                'app-icon w-2.5',
                {
                  'icon-chevron-right': !active,
                  'icon-chevron-down': active
                }
              ]"
            />
          </a>
        </template>
      </PanelMenu>
    </UseScrollbar>
    <div class="sidebar-footer">
      <Button
        severity="secondary"
        icon="app-icon icon-right-from-bracket"
        :label="$t('buttons.sign_out')"
        @click="$emit('logout')"
      />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
