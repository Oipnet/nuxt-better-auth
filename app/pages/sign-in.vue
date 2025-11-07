<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full">
      <UiCard variant="elevated" padding="lg">
        <template #header>
          <h1 class="text-center text-3xl font-extrabold text-gray-900">
            {{ t('auth.signIn.title') }}
          </h1>
        </template>

        <form class="space-y-6" novalidate @submit="handleSignIn">
          <div class="space-y-4">
            <UiFormField
              id="email"
              :label="t('auth.signIn.emailLabel')"
              :error="emailError"
              hide-label
            >
              <UiInput
                id="email"
                name="email"
                type="email"
                variant="rounded-top"
                v-model="email"
                :placeholder="t('auth.signIn.emailLabel')"
                :error="emailError"
              />
            </UiFormField>

            <UiFormField
              id="password"
              :label="t('auth.signIn.passwordLabel')"
              :error="passwordError"
              hide-label
            >
              <UiInput
                id="password"
                name="password"
                type="password"
                variant="rounded-bottom"
                v-model="password"
                :placeholder="t('auth.signIn.passwordLabel')"
                :error="passwordError"
              />
            </UiFormField>
          </div>

          <UiButton type="submit" variant="primary" size="md" full-width>
            {{ t('auth.signIn.submit') }}
          </UiButton>
        </form>

        <template #footer>
          <div class="text-center">
            <NuxtLinkLocale
              to="sign-up"
              class="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out"
            >
              {{ t('auth.signIn.linkToSignUp') }}
            </NuxtLinkLocale>
          </div>
        </template>
      </UiCard>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports';
import { useSignInForm } from '~/composables/useSignInForm';

const localePath = useLocalePath();
const { t } = useI18n();

const { email, password, emailError, passwordError, handleSignIn } =
  useSignInForm();
</script>
