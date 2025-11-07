import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UiFormField from '../../../app/components/ui/forms/UiFormField.vue';

describe('UiFormField', () => {
  it('should render with default props', () => {
    const wrapper = mount(UiFormField);

    expect(wrapper.find('.space-y-1').exists()).toBe(true);
  });

  it('should render label when provided', () => {
    const wrapper = mount(UiFormField, {
      props: {
        label: 'Test Label',
        id: 'test-field',
      },
    });

    const label = wrapper.find('label');
    expect(label.exists()).toBe(true);
    expect(label.text()).toBe('Test Label');
    expect(label.attributes('for')).toBe('test-field');
  });

  it('should hide label when hideLabel is true', () => {
    const wrapper = mount(UiFormField, {
      props: {
        label: 'Test Label',
        hideLabel: true,
      },
    });

    expect(wrapper.find('label').exists()).toBe(false);
  });

  it('should show required asterisk when required is true', () => {
    const wrapper = mount(UiFormField, {
      props: {
        label: 'Test Label',
        required: true,
      },
    });

    const asterisk = wrapper.find('span.text-red-500');
    expect(asterisk.exists()).toBe(true);
    expect(asterisk.text()).toBe('*');
  });

  it('should not show asterisk when required is false', () => {
    const wrapper = mount(UiFormField, {
      props: {
        label: 'Test Label',
        required: false,
      },
    });

    expect(wrapper.find('span.text-red-500').exists()).toBe(false);
  });

  it('should render hint text when provided and no error', () => {
    const wrapper = mount(UiFormField, {
      props: {
        hint: 'This is a helpful hint',
      },
    });

    const hint = wrapper.find('.text-sm.text-gray-500');
    expect(hint.exists()).toBe(true);
    expect(hint.text()).toBe('This is a helpful hint');
  });

  it('should not render hint when error is present', () => {
    const wrapper = mount(UiFormField, {
      props: {
        hint: 'This is a helpful hint',
        error: 'This is an error',
      },
    });

    expect(wrapper.find('.text-sm.text-gray-500').exists()).toBe(false);
  });

  it('should render error message when provided', () => {
    const wrapper = mount(UiFormField, {
      props: {
        error: 'This is an error message',
      },
    });

    const error = wrapper.find('.text-sm.text-red-600');
    expect(error.exists()).toBe(true);
    expect(error.text()).toBe('This is an error message');
  });

  it('should render slot content', () => {
    const wrapper = mount(UiFormField, {
      slots: {
        default: '<input type="text" />',
      },
    });

    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should apply correct label size classes', () => {
    const smallWrapper = mount(UiFormField, {
      props: {
        label: 'Small Label',
        labelSize: 'sm',
      },
    });

    const mediumWrapper = mount(UiFormField, {
      props: {
        label: 'Medium Label',
        labelSize: 'md',
      },
    });

    const largeWrapper = mount(UiFormField, {
      props: {
        label: 'Large Label',
        labelSize: 'lg',
      },
    });

    expect(smallWrapper.find('label').classes()).toContain('text-sm');
    expect(mediumWrapper.find('label').classes()).toContain('text-sm');
    expect(largeWrapper.find('label').classes()).toContain('text-base');
  });

  it('should apply base label classes', () => {
    const wrapper = mount(UiFormField, {
      props: {
        label: 'Test Label',
      },
    });

    const label = wrapper.find('label');
    expect(label.classes()).toContain('block');
    expect(label.classes()).toContain('font-medium');
    expect(label.classes()).toContain('text-gray-700');
  });

  it('should have relative positioning for slot container', () => {
    const wrapper = mount(UiFormField);

    expect(wrapper.find('.relative').exists()).toBe(true);
  });

  it('should work without any props', () => {
    const wrapper = mount(UiFormField);

    expect(wrapper.find('.space-y-1').exists()).toBe(true);
    expect(wrapper.find('label').exists()).toBe(false);
    expect(wrapper.find('.text-sm.text-gray-500').exists()).toBe(false);
    expect(wrapper.find('.text-sm.text-red-600').exists()).toBe(false);
  });

  it('should render complex slot content correctly', () => {
    const wrapper = mount(UiFormField, {
      props: {
        label: 'Complex Field',
        error: 'Validation error',
      },
      slots: {
        default: `
          <div class="field-container">
            <input type="text" class="form-input" />
            <button type="button" class="field-button">Action</button>
          </div>
        `,
      },
    });

    expect(wrapper.find('.field-container').exists()).toBe(true);
    expect(wrapper.find('.form-input').exists()).toBe(true);
    expect(wrapper.find('.field-button').exists()).toBe(true);
  });
});