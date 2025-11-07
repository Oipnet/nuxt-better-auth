<template>
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
            v-model="email"
            name="email"
            type="email"
            variant="rounded-top"
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
            v-model="password"
            name="password"
            type="password"
            variant="rounded-bottom"
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
        <UiLink to="sign-up" variant="default">
          {{ t('auth.signIn.linkToSignUp') }}
        </UiLink>
      </div>
    </template>
  </UiCard>
</template>

<script setup lang="ts">
import { useI18n } from '#imports'
import { useSignInForm } from '~/composables/useSignInForm'

// Interface pour les props (si besoin d'options dans le futur)
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Props {
  // On peut ajouter des props si nécessaire, par exemple:
  // redirectUrl?: string
  // showSignUpLink?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<Props>(), {
  // Valeurs par défaut si nécessaire
})

// Composable pour la traduction
const { t } = useI18n()

// Logique métier du formulaire de connexion
const { email, password, emailError, passwordError, handleSignIn } =
  useSignInForm()
</script>
