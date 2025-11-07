import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UiButton from '../../../../app/components/ui/base/UiButton.vue';

// Mock du composant NuxtLinkLocale
const NuxtLinkLocaleMock = {
  template: '<a :href="to"><slot /></a>',
  props: ['to'],
};

describe('UiButton', () => {
  it('renders a button by default', () => {
    const wrapper = mount(UiButton, {
      slots: {
        default: 'Click me',
      },
    });

    expect(wrapper.element.tagName).toBe('BUTTON');
    expect(wrapper.text()).toBe('Click me');
  });

  it('renders with primary variant classes', () => {
    const wrapper = mount(UiButton, {
      props: {
        variant: 'primary',
      },
      slots: {
        default: 'Primary Button',
      },
    });

    expect(wrapper.classes()).toContain('bg-indigo-600');
    expect(wrapper.classes()).toContain('text-white');
  });

  it('renders with ghost variant classes', () => {
    const wrapper = mount(UiButton, {
      props: {
        variant: 'ghost',
      },
      slots: {
        default: 'Ghost Button',
      },
    });

    expect(wrapper.classes()).toContain('text-indigo-600');
    expect(wrapper.classes()).toContain('bg-transparent');
  });

  it('renders with correct size classes', () => {
    const wrapper = mount(UiButton, {
      props: {
        size: 'lg',
      },
      slots: {
        default: 'Large Button',
      },
    });

    expect(wrapper.classes()).toContain('px-6');
    expect(wrapper.classes()).toContain('py-3');
    expect(wrapper.classes()).toContain('text-base');
  });

  it('renders with full width when fullWidth is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        fullWidth: true,
      },
      slots: {
        default: 'Full Width',
      },
    });

    expect(wrapper.classes()).toContain('w-full');
  });

  it('renders as NuxtLinkLocale when "to" prop is provided', () => {
    const wrapper = mount(UiButton, {
      props: {
        to: '/test-path',
      },
      slots: {
        default: 'Link Button',
      },
    });

    // On vérifie que le composant utilise NuxtLinkLocale
    expect(wrapper.findComponent({ name: 'NuxtLinkLocale' }).exists()).toBe(
      true
    );
    expect(wrapper.findComponent({ name: 'NuxtLinkLocale' }).props('to')).toBe(
      '/test-path'
    );
  });

  it('shows loading spinner when loading is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        loading: true,
      },
      slots: {
        default: 'Loading...',
      },
    });

    expect(wrapper.find('svg').exists()).toBe(true);
    expect(wrapper.find('.animate-spin').exists()).toBe(true);
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(UiButton, {
      props: {
        disabled: true,
      },
      slots: {
        default: 'Disabled Button',
      },
    });

    expect(wrapper.attributes('disabled')).toBeDefined();
    // Vérifie que les classes de base contiennent les classes de désactivation
    expect(wrapper.classes()).toContain('disabled:opacity-50');
    expect(wrapper.classes()).toContain('disabled:cursor-not-allowed');
  });

  it('has correct type attribute', () => {
    const wrapper = mount(UiButton, {
      props: {
        type: 'submit',
      },
      slots: {
        default: 'Submit',
      },
    });

    expect(wrapper.attributes('type')).toBe('submit');
  });

  it('emits click event when clicked', async () => {
    const wrapper = mount(UiButton, {
      slots: {
        default: 'Click me',
      },
    });

    await wrapper.trigger('click');
    expect(wrapper.emitted('click')).toBeTruthy();
  });
});
