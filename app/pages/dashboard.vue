<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-sm p-6">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ t('dashboard.title') }}
      </h1>
      <p class="text-gray-600 mb-6">
        {{ t('dashboard.description') }}
      </p>

      <!-- Actions temporaires -->
      <div class="flex items-center space-x-4 pt-4 border-t border-gray-200">
        <UiButton variant="outline" @click="handleLogout">
          {{ t('navigation.signOut') }}
        </UiButton>

        <NuxtLinkLocale to="index">
          <UiButton variant="ghost">
            {{ t('navigation.home') }}
          </UiButton>
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n, useLocalePath, useRouter } from '#imports'
import { signOut } from '~/lib/auth-client'

// Utiliser le layout authentifié
definePageMeta({
  layout: 'authenticated'
})

const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()

const handleLogout = async () => {
  await signOut()
  router.push(localePath('index'))
}
</script>
