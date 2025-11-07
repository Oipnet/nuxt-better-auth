<template>
  <NuxtLinkLocale 
    :to="to"
    :class="linkClasses"
    v-bind="$attrs"
  >
    <slot />
  </NuxtLinkLocale>
</template>

<script setup lang="ts">
interface Props {
  to: string
  variant?: 'default' | 'muted' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  underline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  underline: false
})

const linkClasses = computed(() => {
  const baseClasses = 'font-medium transition duration-150 ease-in-out'
  
  const variantClasses = {
    default: 'text-indigo-600 hover:text-indigo-500',
    muted: 'text-gray-500 hover:text-gray-700',
    danger: 'text-red-600 hover:text-red-500'
  }
  
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }
  
  const underlineClasses = props.underline ? 'underline hover:no-underline' : 'hover:underline'
  
  return [
    baseClasses,
    variantClasses[props.variant],
    sizeClasses[props.size],
    underlineClasses
  ].join(' ')
})
</script>