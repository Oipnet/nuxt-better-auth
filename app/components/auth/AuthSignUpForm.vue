<template>
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
            v-model="name"
            name="name"
            type="text"
            variant="default"
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
            v-model="email"
            name="email"
            type="email"
            variant="default"
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
            v-model="password"
            name="password"
            type="password"
            variant="default"
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
        <span class="text-sm text-gray-500">
          {{ t('auth.signUp.alreadyHaveAccount') }}
        </span>
        <UiLink to="sign-in" variant="default">
          {{ t('auth.signUp.linkToSignIn') }}
        </UiLink>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useSignUpForm } from '~/composables/useSignUpForm'

// Interface pour les props (si besoin d'options dans le futur)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {
  // On peut ajouter des props si nécessaire, par exemple:
  // redirectUrl?: string
  // showSignInLink?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  // Valeurs par défaut si nécessaire
})

// Composable pour la traduction
const { t } = useI18n()

// Logique métier du formulaire d'inscription
const {
  name,
  email,
  password,
  nameError,
  emailError,
  passwordError,
  handleSignUp
} = useSignUpForm()
</script>
