<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header avec navigation -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo/Titre -->
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Better Auth</h1>
          </div>

          <!-- Actions utilisateur -->
          <div class="flex items-center space-x-4">
            <lang-switcher />

            <!-- Bouton de déconnexion -->
            <UiButton variant="outline" size="sm" @click="handleLogout">
              {{ t('navigation.signOut') }}
            </UiButton>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main>
      <slot />
    </main>
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
