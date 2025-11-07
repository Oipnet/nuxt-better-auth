<template>
  <component
    :is="tag"
    :type="tag === 'button' ? type : undefined"
    :to="props.to ? to : undefined"
    :class="buttonClasses"
    :disabled="disabled || loading"
    v-bind="$attrs"
  >
    <div v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
    <slot />
  </component>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  to?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false,
});

const tag = computed(() => {
  return props.to ? resolveComponent('NuxtLinkLocale') : 'button';
});

const buttonClasses = computed(() => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary:
      'text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 border border-transparent',
    secondary:
      'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:ring-indigo-500 border border-transparent',
    outline:
      'text-indigo-700 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500 border border-indigo-300',
    ghost:
      'text-indigo-600 bg-transparent hover:bg-indigo-50 focus:ring-indigo-500 border border-transparent',
    danger:
      'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent',
  };

  const widthClasses = props.fullWidth ? 'w-full' : '';

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    widthClasses,
  ].join(' ');
});
</script>
