<template>
  <nav>
    <ul>
      <li><NuxtLinkLocale to="index">{{ t('navigation.home') }}</NuxtLinkLocale></li>
      <li><button @click.prevent="handleLogout">{{ t('navigation.signOut') }}</button></li>
    </ul>
  </nav>
  <div>
    <h1>{{ t('dashboard.title') }}</h1>
    <p>{{ t('dashboard.description') }}</p>
  </div>
</template>

<script setup lang="ts">
import { useI18n, useLocalePath, useRouter } from '#imports';
import { signOut } from '~/lib/auth-client';

const { t } = useI18n();
const router = useRouter();
const localePath = useLocalePath();

const handleLogout = async () => {
  await signOut();
  router.push(localePath('index'));
};
</script>
