<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <UiCard variant="elevated" padding="lg">
        <template #header>
          <h1 class="text-center text-3xl font-extrabold text-gray-900">
            {{ t('auth.signUp.title') }}
          </h1>
          <p class="mt-2 text-center text-sm text-gray-600">
            {{ t('auth.signUp.subtitle') }}
          </p>
        </template>

        <form class="space-y-6" novalidate @submit="handleSignUp">
          <div class="space-y-4">
            <UiFormField
              id="name"
              :label="t('auth.signUp.nameLabel')"
              :error="nameError"
              hide-label
            >
              <UiInput
                id="name"
                name="name"
                type="text"
                variant="default"
                v-model="name"
                :placeholder="t('auth.signUp.nameLabel')"
                :error="nameError"
              />
            </UiFormField>

            <UiFormField
              id="email"
              :label="t('auth.signUp.emailLabel')"
              :error="emailError"
              hide-label
            >
              <UiInput
                id="email"
                name="email"
                type="email"
                variant="default"
                v-model="email"
                :placeholder="t('auth.signUp.emailLabel')"
                :error="emailError"
              />
            </UiFormField>

            <UiFormField
              id="password"
              :label="t('auth.signUp.passwordLabel')"
              :error="passwordError"
              hide-label
            >
              <UiInput
                id="password"
                name="password"
                type="password"
                variant="default"
                v-model="password"
                :placeholder="t('auth.signUp.passwordLabel')"
                :error="passwordError"
              />
            </UiFormField>
          </div>

          <UiButton type="submit" variant="primary" size="md" full-width>
            {{ t('auth.signUp.submit') }}
          </UiButton>
        </form>

        <template #footer>
          <div class="text-center">
            <span class="text-sm text-gray-500"
              >{{ t('auth.signUp.alreadyHaveAccount') }}
            </span>
            <NuxtLinkLocale
              to="sign-in"
              class="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
            >
              {{ t('auth.signUp.linkToSignIn') }}
            </NuxtLinkLocale>
          </div>
        </template>
      </UiCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports';
import { useSignUpForm } from '~/composables/useSignUpForm';

const localePath = useLocalePath();
const { t } = useI18n();

const {
  name,
  email,
  password,
  nameError,
  emailError,
  passwordError,
  handleSignUp,
} = useSignUpForm();
</script>
