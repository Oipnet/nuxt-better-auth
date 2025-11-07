<template>
  <div class="min-h-screen bg-white">
    <!-- Header/Navigation -->
    <header class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex items-center">
            <h2 class="text-xl font-bold text-indigo-600">Better Auth</h2>
          </div>

          <!-- Navigation -->
          <div class="flex items-center space-x-4">
            <lang-switcher />

            <!-- Auth buttons -->
            <div class="flex items-center space-x-2">
              <UiButton variant="ghost" to="sign-in">
                {{ t('navigation.signIn') }}
              </UiButton>
              <UiButton variant="primary" to="sign-up">
                {{ t('navigation.signUp') }}
              </UiButton>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="py-20 md:py-28">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
            {{ t('home.hero.title') }}
          </h1>
          <p class="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {{ t('home.hero.subtitle') }}
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UiButton variant="primary" size="lg" to="sign-up">
              {{ t('home.hero.getStarted') }}
            </UiButton>
            <UiButton variant="outline" size="lg" to="sign-in">
              {{ t('home.hero.signIn') }}
            </UiButton>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div
        class="py-16 bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8"
      >
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            {{ t('home.features.title') }}
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            {{ t('home.features.subtitle') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <UiCard variant="elevated" padding="lg" class="text-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ t('home.features.security.title') }}
            </h3>
            <p class="text-gray-600">
              {{ t('home.features.security.description') }}
            </p>
          </UiCard>

          <!-- Feature 2 -->
          <UiCard variant="elevated" padding="lg" class="text-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ t('home.features.performance.title') }}
            </h3>
            <p class="text-gray-600">
              {{ t('home.features.performance.description') }}
            </p>
          </UiCard>

          <!-- Feature 3 -->
          <UiCard variant="elevated" padding="lg" class="text-center">
            <div
              class="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-6 h-6 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">
              {{ t('home.features.experience.title') }}
            </h3>
            <p class="text-gray-600">
              {{ t('home.features.experience.description') }}
            </p>
          </UiCard>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p class="text-gray-400">
          {{ t('home.footer.copyright') }}
        </p>
      </div>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { useI18n } from '#imports';

const { t } = useI18n();
</script>
