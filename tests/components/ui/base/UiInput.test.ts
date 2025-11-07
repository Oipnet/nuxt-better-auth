import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UiInput from '../../../../app/components/ui/base/UiInput.vue';

describe('UiInput', () => {
  it('renders an input by default', () => {
    const wrapper = mount(UiInput);

    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.find('input').attributes('type')).toBe('text');
  });

  it('renders with correct type', () => {
    const wrapper = mount(UiInput, {
      props: {
        type: 'email',
      },
    });

    expect(wrapper.find('input').attributes('type')).toBe('email');
  });

  it('renders with correct placeholder', () => {
    const wrapper = mount(UiInput, {
      props: {
        placeholder: 'Enter your email',
      },
    });

    expect(wrapper.find('input').attributes('placeholder')).toBe(
      'Enter your email'
    );
  });

  it('renders with correct value', () => {
    const wrapper = mount(UiInput, {
      props: {
        modelValue: 'test@example.com',
      },
    });

    expect(wrapper.find('input').element.value).toBe('test@example.com');
  });

  it('emits update:modelValue when input changes', async () => {
    const wrapper = mount(UiInput);
    const input = wrapper.find('input');

    await input.setValue('new value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
  });

  it('renders with default variant classes', () => {
    const wrapper = mount(UiInput);

    expect(wrapper.find('input').classes()).toContain('rounded-md');
    expect(wrapper.find('input').classes()).toContain('border-gray-300');
  });

  it('renders with rounded-full variant classes', () => {
    const wrapper = mount(UiInput, {
      props: {
        variant: 'rounded-full',
      },
    });

    expect(wrapper.find('input').classes()).toContain('rounded-full');
  });

  it('shows error state when error prop is provided', () => {
    const wrapper = mount(UiInput, {
      props: {
        error: 'This field is required',
      },
    });

    expect(wrapper.find('input').classes()).toContain('border-red-500');
    expect(wrapper.find('input').classes()).toContain('focus:border-red-500');
    expect(wrapper.find('input').classes()).toContain('focus:ring-red-500');
  });

  it('renders with rounded-top variant classes', () => {
    const wrapper = mount(UiInput, {
      props: {
        variant: 'rounded-top',
      },
    });

    expect(wrapper.find('input').classes()).toContain('rounded-t-md');
    expect(wrapper.find('input').classes()).toContain('rounded-b-none');
  });

  it('renders with rounded-bottom variant classes', () => {
    const wrapper = mount(UiInput, {
      props: {
        variant: 'rounded-bottom',
      },
    });

    expect(wrapper.find('input').classes()).toContain('rounded-b-md');
    expect(wrapper.find('input').classes()).toContain('rounded-t-none');
  });

  it('renders with correct size classes', () => {
    const wrapperSm = mount(UiInput, {
      props: { size: 'sm' },
    });
    const wrapperLg = mount(UiInput, {
      props: { size: 'lg' },
    });

    expect(wrapperSm.find('input').classes()).toContain('py-1');
    expect(wrapperSm.find('input').classes()).toContain('text-sm');

    expect(wrapperLg.find('input').classes()).toContain('py-3');
    expect(wrapperLg.find('input').classes()).toContain('text-base');
  });

  it('is required when required prop is true', () => {
    const wrapper = mount(UiInput, {
      props: {
        required: true,
      },
    });

    expect(wrapper.find('input').attributes('required')).toBeDefined();
  });

  it('has correct id when id prop is provided', () => {
    const wrapper = mount(UiInput, {
      props: {
        id: 'test-input',
      },
    });

    expect(wrapper.find('input').attributes('id')).toBe('test-input');
  });

  it('has correct name when name prop is provided', () => {
    const wrapper = mount(UiInput, {
      props: {
        name: 'email',
      },
    });

    expect(wrapper.find('input').attributes('name')).toBe('email');
  });
});
