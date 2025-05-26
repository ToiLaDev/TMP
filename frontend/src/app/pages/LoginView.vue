<script setup lang="ts">
import { reactive } from 'vue'
import { useAuthStore } from '@/app/store/auth'
import { useRouter } from 'vue-router'
import * as yup from 'yup'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import InputDefault from '@/app/components/form/InputCustom.vue'
import CheckboxDefault from '@/app/components/form/CheckboxCustom.vue'
import { useI18n } from '@/core/useI18n'

const AUTH = useAuthStore()
const router = useRouter()
const { t } = useI18n()
const popState = reactive({
  loading: false
})

const { errors, defineField, handleSubmit } = useForm({
  initialValues: {
    email: 'test@example.com',
    password: '123456',
    remember: false
  },
  validationSchema: toTypedSchema(
    yup.object({
      email: yup.string().email(t('login.errors.email')).required(t('login.errors.required')),
      password: yup
        .string()
        .min(6, t('login.errors.min', { min: 6 }))
        .required(t('login.errors.required')),
      remember: yup.boolean()
    })
  )
})

const [email] = defineField('email')
const [password] = defineField('password')
const [remember] = defineField('remember')

const submitHandle = handleSubmit(async (values) => {
  popState.loading = true
  if (await AUTH.login(values)) {
    await router.push({ name: 'home' })
  }
  popState.loading = false
})
</script>

<template>
  <div class="flex flex-col mb-6">
    <img
      src="/assets/images/logo.svg"
      alt="Image"
      class="mb-4 h-16"
    />
    <div class="text-center text-surface-900 dark:text-surface-0 text-3xl font-medium mb-2">{{ $t('login.welcome') }}</div>
    <!--    <span class="text-surface-600 dark:text-surface-200 font-medium leading-normal">Don't have an account?</span>-->
    <!--    <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">Create today!</a>-->
  </div>
  <Message
    class="mb-3"
    v-if="AUTH.lastError"
    severity="error"
    >{{ $t(AUTH.lastError.message) }}</Message
  >
  <div>
    <label
      for="input-email"
      class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
      >{{ $t('login.email') }}</label
    >
    <InputDefault
      v-model="email"
      id="input-email"
      type="text"
      class="w-full mb-4"
      :disabled="popState.loading"
      :error="errors.email"
    />

    <label
      for="input-password"
      class="block text-surface-900 dark:text-surface-0 font-medium mb-2"
      >{{ $t('login.password') }}</label
    >
    <InputDefault
      v-model="password"
      type="password"
      id="input-password"
      class="w-full mb-4"
      inputClass="w-full"
      :disabled="popState.loading"
      :error="errors.password"
    />
    <div class="flex items-center justify-between mb-6">
      <CheckboxDefault
        v-model="remember"
        id="input-remember"
        :disabled="popState.loading"
        :label="$t('login.remember')"
      />
      <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">{{ $t('login.forgot_password') }}</a>
    </div>
    <Button
      @click="submitHandle"
      :label="$t('login.sign_in')"
      id="submit-button"
      icon="app-icon icon-user"
      class="w-full"
      :loading="popState.loading"
    ></Button>
  </div>
</template>

<style scoped></style>
