<template>
  <div>
    <h1>{{ t('auth.signUp.title') }}</h1>
    <form novalidate @submit.prevent="handleSignUp">
      <div>
        <label for="name">{{ t('auth.signUp.nameLabel') }}</label>
        <input id="name" type="text" v-model="name" />
        <p v-if="nameError">{{ nameError }}</p>
      </div>
      <div>
        <label for="email">{{ t('auth.signUp.emailLabel') }}</label>
        <input id="email" type="email" v-model="email" />
        <p v-if="emailError">{{ emailError }}</p>
      </div>
      <div>
        <label for="password">{{ t('auth.signUp.passwordLabel') }}</label>
        <input id="password" type="password" v-model="password" />
        <p v-if="passwordError">{{ passwordError }}</p>
      </div>
      <button type="submit">{{ t('auth.signUp.submit') }}</button>
    </form>
    <NuxtLinkLocale to="sign-in">{{ t('auth.signUp.linkToSignIn') }}</NuxtLinkLocale>
  </div>
</template>
<script setup lang="ts">
import { useI18n, useLocalePath } from '#imports';
import { useSignUpForm } from '~/composables/useSignUpForm';

const localePath = useLocalePath();
const { t } = useI18n();

const { name, email, password, nameError, emailError, passwordError, handleSignUp } = useSignUpForm();
</script>
