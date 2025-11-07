<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <!-- Trigger slot -->
    <div @click="toggle">
      <slot name="trigger" :is-open="isOpen" :toggle="toggle" />
    </div>

    <!-- Dropdown Content -->
    <Transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div v-show="isOpen" :class="dropdownClasses">
        <div :class="contentClasses">
          <slot :close="close" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
interface Props {
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  width?: 'auto' | 'trigger' | 'sm' | 'md' | 'lg';
  offset?: number;
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottom-right',
  width: 'trigger',
  offset: 2
})

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement>()

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

// Fermer le dropdown quand on clique en dehors
onClickOutside(dropdownRef, close)

const dropdownClasses = computed(() => {
  const baseClasses =
    'absolute z-50 bg-white border border-gray-200 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'

  const placementClasses = {
    'bottom-left': 'left-0 mt-2 origin-top-left',
    'bottom-right': 'right-0 mt-2 origin-top-right',
    'top-left': 'left-0 mb-2 bottom-full origin-bottom-left',
    'top-right': 'right-0 mb-2 bottom-full origin-bottom-right'
  }

  const widthClasses = {
    auto: 'w-auto',
    trigger: 'w-full min-w-[140px]',
    sm: 'w-48',
    md: 'w-56',
    lg: 'w-64'
  }

  return [
    baseClasses,
    placementClasses[props.placement],
    widthClasses[props.width]
  ].join(' ')
})

const contentClasses = computed(() => {
  return 'py-1'
})
</script>
