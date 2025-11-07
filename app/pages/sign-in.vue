<template>
  <div>
    <h1>{{ t('auth.signIn.title') }}</h1>
    <form novalidate @submit.prevent="handleSignIn">
      <div>
        <label for="email">{{ t('auth.signIn.emailLabel') }}</label>
        <input id="email" type="email" v-model="email" />
        <p v-if="emailError">{{ emailError }}</p>
      </div>
      <div>
        <label for="password">{{ t('auth.signIn.passwordLabel') }}</label>
        <input id="password" type="password" v-model="password" />
        <p v-if="passwordError">{{ passwordError }}</p>
      </div>
      <button type="submit">{{ t('auth.signIn.submit') }}</button>
    </form>
    <NuxtLinkLocale to="sign-up">{{ t('auth.signIn.linkToSignUp') }}</NuxtLinkLocale>
  </div>
</template>
<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports';
import { useSignInForm } from '~/composables/useSignInForm';

const localePath = useLocalePath();
const { t } = useI18n();

const { email, password, emailError, passwordError, handleSignIn } = useSignInForm();
</script>
