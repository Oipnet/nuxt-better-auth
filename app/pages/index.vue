<template>
  <header>
    <nav>
      <ul>
        <li><NuxtLinkLocale to="dashboard">{{ t('navigation.dashboard') }}</NuxtLinkLocale></li>
      </ul>
    </nav>
  </header>
  <div>
    <h1>{{ t('home.title') }}</h1>
    <p>{{ t('home.description') }}</p>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();
</script>
