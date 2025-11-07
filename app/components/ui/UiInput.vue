<template>
  <input
    :id="id"
    :type="type"
    :placeholder="placeholder"
    :value="modelValue"
    @input="handleInput"
    @blur="$emit('blur', $event)"
    :class="inputClasses"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
interface Props {
  id?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  modelValue?: string;
  error?: string;
  variant?: 'default' | 'rounded-top' | 'rounded-bottom' | 'rounded-full';
  size?: 'sm' | 'md' | 'lg';
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  variant: 'default',
  size: 'md',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  blur: [event: Event];
}>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};

const inputClasses = computed(() => {
  const baseClasses =
    'relative block w-full px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 transition duration-150 ease-in-out';

  const sizeClasses = {
    sm: 'py-1 text-sm',
    md: 'py-2 sm:text-sm',
    lg: 'py-3 text-base',
  };

  const variantClasses = {
    default: 'rounded-md',
    'rounded-top': 'rounded-t-md rounded-b-none',
    'rounded-bottom': 'rounded-b-md rounded-t-none',
    'rounded-full': 'rounded-full',
  };

  const errorClasses = props.error
    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
    : '';

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    errorClasses,
  ].join(' ');
});
</script>
