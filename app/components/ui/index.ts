// Base components (primitives)
export { default as UiButton } from './base/UiButton.vue'
export { default as UiInput } from './base/UiInput.vue'
export { default as UiLink } from './base/UiLink.vue'

// Layout components
export { default as UiCard } from './layout/UiCard.vue'

// Form components
export { default as UiFormField } from './forms/UiFormField.vue'

// Navigation components
export { default as UiDropdown } from './navigation/UiDropdown.vue'

// Types (à ajouter si nécessaire)
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type LinkVariant = 'default' | 'muted' | 'danger';
