import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import UiCard from '../../../../app/components/ui/layout/UiCard.vue';

describe('UiCard', () => {
  it('renders with default classes', () => {
    const wrapper = mount(UiCard, {
      slots: {
        default: 'Card content',
      },
    });

    expect(wrapper.classes()).toContain('bg-white');
    expect(wrapper.classes()).toContain('overflow-hidden');
    expect(wrapper.classes()).toContain('rounded-lg');
  });

  it('renders with variant classes', () => {
    const elevatedWrapper = mount(UiCard, {
      props: { variant: 'elevated' },
      slots: { default: 'Content' },
    });

    const outlinedWrapper = mount(UiCard, {
      props: { variant: 'outlined' },
      slots: { default: 'Content' },
    });

    expect(elevatedWrapper.classes()).toContain('shadow-lg');
    expect(outlinedWrapper.classes()).toContain('border');
    expect(outlinedWrapper.classes()).toContain('border-gray-200');
  });

  it('renders with different rounded variants', () => {
    const wrapper = mount(UiCard, {
      props: { rounded: 'xl' },
      slots: { default: 'Content' },
    });

    expect(wrapper.classes()).toContain('rounded-xl');
  });

  it('renders default slot content', () => {
    const wrapper = mount(UiCard, {
      slots: {
        default: '<p>Card body content</p>',
      },
    });

    expect(wrapper.html()).toContain('Card body content');
  });

  it('renders header slot when provided', () => {
    const wrapper = mount(UiCard, {
      slots: {
        header: '<h2>Card Header</h2>',
        default: 'Card content',
      },
    });

    const allDivs = wrapper.findAll('div');
    // Le header est le premier div enfant (index 1, car index 0 est le container)
    const headerDiv = allDivs[1];

    expect(headerDiv.html()).toContain('Card Header');
    expect(headerDiv.classes()).toContain('border-b');
    expect(headerDiv.classes()).toContain('border-gray-200');
    expect(headerDiv.classes()).toContain('px-6');
    expect(headerDiv.classes()).toContain('py-4');
  });

  it('renders footer slot when provided', () => {
    const wrapper = mount(UiCard, {
      slots: {
        footer: '<div>Card Footer</div>',
        default: 'Card content',
      },
    });

    const allDivs = wrapper.findAll('div');
    // Le footer du composant UiCard (pas le div du slot) est à l'index 2
    // Index 0: container, Index 1: body, Index 2: footer container
    const footerContainer = allDivs[2];

    expect(footerContainer.html()).toContain('Card Footer');
    expect(footerContainer.classes()).toContain('border-t');
    expect(footerContainer.classes()).toContain('border-gray-200');
    expect(footerContainer.classes()).toContain('bg-gray-50');
    expect(footerContainer.classes()).toContain('px-6');
    expect(footerContainer.classes()).toContain('py-4');
  });

  it('does not render header when header slot is not provided', () => {
    const wrapper = mount(UiCard, {
      slots: {
        default: 'Card content',
      },
    });

    // Devrait seulement avoir 2 divs (container + body)
    expect(wrapper.findAll('div')).toHaveLength(2);
  });

  it('does not render footer when footer slot is not provided', () => {
    const wrapper = mount(UiCard, {
      slots: {
        default: 'Card content',
      },
    });

    // Devrait seulement avoir 2 divs (container + body)
    expect(wrapper.findAll('div')).toHaveLength(2);
  });

  it('renders all slots together', () => {
    const wrapper = mount(UiCard, {
      slots: {
        header: '<h2>Header</h2>',
        default: '<p>Body</p>',
        footer: '<div>Footer</div>',
      },
    });

    expect(wrapper.html()).toContain('Header');
    expect(wrapper.html()).toContain('Body');
    expect(wrapper.html()).toContain('Footer');

    // Le nombre total de divs inclut le container UiCard + les slots avec leurs propres divs
    // Container: 1, Header container: 1, Body container: 1, Footer container: 1, div dans footer slot: 1 = 5 divs
    expect(wrapper.findAll('div')).toHaveLength(5);
  });

  it('has correct body styling with different padding', () => {
    const smWrapper = mount(UiCard, {
      props: { padding: 'sm' },
      slots: { default: 'Content' },
    });

    const lgWrapper = mount(UiCard, {
      props: { padding: 'lg' },
      slots: { default: 'Content' },
    });

    // Le body est le deuxième div (index 1)
    expect(smWrapper.findAll('div')[1].classes()).toContain('p-3');
    expect(lgWrapper.findAll('div')[1].classes()).toContain('p-8');
  });

  it('applies different padding to header and footer', () => {
    const wrapper = mount(UiCard, {
      props: { padding: 'lg' },
      slots: {
        header: 'Header',
        default: 'Body',
        footer: 'Footer',
      },
    });

    const divs = wrapper.findAll('div');
    // Header est le deuxième div (index 1)
    // Footer est le quatrième div (index 3)
    expect(divs[1].classes()).toContain('px-8');
    expect(divs[1].classes()).toContain('py-6');
    expect(divs[3].classes()).toContain('px-8');
    expect(divs[3].classes()).toContain('py-6');
  });
});
