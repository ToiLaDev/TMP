import { describe, it, expect, beforeEach, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LoginView from '@/app/pages/LoginView.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/app/store/auth'

describe('LoginView', async () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the login form', () => {
    const wrapper = shallowMount(LoginView, {
      global: {
        mocks: {
          $t: (msg: any) => msg
        }
      }
    })
    expect(wrapper.find('#input-email').exists()).toBe(true)
    expect(wrapper.find('#input-password').exists()).toBe(true)
  })

  it('handles successful login', async () => {
    const store = useAuthStore()
    const wrapper = shallowMount(LoginView, {
      global: {
        mocks: {
          $t: (msg: any) => msg
        }
      }
    })

    const loginCredentials = {
      email: 'test@example.com',
      password: '123456',
      remember: false
    }

    const authLogin = vi.spyOn(store, 'login')
    const inputEmail = wrapper.findComponent('#input-email')
    const inputPassword = wrapper.findComponent('#input-password')
    const button = wrapper.findComponent('#submit-button')
    await inputEmail.setValue(loginCredentials.email)
    await inputPassword.setValue(loginCredentials.password)
    await button.trigger('click')

    expect(authLogin).toHaveBeenCalledWith(loginCredentials)

    // Call the mocked function and check its return value
    // const result = await store.login(loginCredentials)
    // expect(result).toBe(true)
  })
})
