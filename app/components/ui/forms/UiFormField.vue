<template>
  <div class="space-y-1">
    <label v-if="label && !hideLabel" :for="id" :class="labelClasses">
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <slot />
    </div>

    <div v-if="hint && !error" class="text-sm text-gray-500">
      {{ hint }}
    </div>

    <div v-if="error" class="text-sm text-red-600">
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string;
  label?: string;
  hideLabel?: boolean;
  required?: boolean;
  hint?: string;
  error?: string;
  labelSize?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  hideLabel: false,
  required: false,
  labelSize: 'md'
})

const labelClasses = computed(() => {
  const baseClasses = 'block font-medium text-gray-700'

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base'
  }

  return [baseClasses, sizeClasses[props.labelSize]].join(' ')
})
</script>
