<template>
  <div :class="cardClasses">
    <div v-if="$slots.header" :class="headerClasses">
      <slot name="header" />
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div v-if="$slots.footer" :class="footerClasses">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  rounded: 'lg'
})

const cardClasses = computed(() => {
  const baseClasses = 'bg-white overflow-hidden'

  const variantClasses = {
    default: '',
    elevated: 'shadow-lg',
    outlined: 'border border-gray-200'
  }

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl'
  }

  return [
    baseClasses,
    variantClasses[props.variant],
    roundedClasses[props.rounded]
  ].join(' ')
})

const headerClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6'
  }

  return ['border-b border-gray-200', paddingClasses[props.padding]].join(' ')
})

const bodyClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  }

  return paddingClasses[props.padding]
})

const footerClasses = computed(() => {
  const paddingClasses = {
    none: '',
    sm: 'px-3 py-2',
    md: 'px-6 py-4',
    lg: 'px-8 py-6'
  }

  return [
    'border-t border-gray-200 bg-gray-50',
    paddingClasses[props.padding]
  ].join(' ')
})
</script>
