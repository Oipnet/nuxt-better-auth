<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const currentLocale = computed(() => {
  return locales.value.find(i => i.code === locale.value)
})

const isOpen = ref(false)

// Fermer le dropdown quand on clique en dehors
const dropdownRef = ref<HTMLElement>()

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

// Icônes pour les langues
const getLanguageIcon = (code: string) => {
  const icons = {
    'fr-FR': '🇫🇷',
    'en-US': '🇺🇸'
  }
  return icons[code as keyof typeof icons] || '🌐'
}
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <!-- Bouton pour ouvrir/fermer le dropdown -->
    <button
      class="inline-flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      :class="{ 'ring-2 ring-indigo-500': isOpen }"
      @click="isOpen = !isOpen"
    >
      <span class="mr-2 text-base">{{
        getLanguageIcon(currentLocale?.code || '')
      }}</span>
      <span class="truncate">{{ currentLocale?.name }}</span>
      <svg
        class="w-4 h-4 ml-2 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-show="isOpen"
        class="absolute right-0 z-10 mt-2 w-full min-w-[140px] origin-top-right bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="py-1">
          <NuxtLink
            v-for="availableLocale in availableLocales"
            :key="availableLocale.code"
            :to="switchLocalePath(availableLocale.code)"
            class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-900 transition duration-150 ease-in-out"
            @click="isOpen = false"
          >
            <span class="mr-3 text-base">{{
              getLanguageIcon(availableLocale.code)
            }}</span>
            <span>{{ availableLocale.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
