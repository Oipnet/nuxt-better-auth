import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import UiDropdown from '../../../app/components/ui/navigation/UiDropdown.vue';

// Mock onClickOutside composable
const mockOnClickOutside = vi.fn();
vi.stubGlobal('onClickOutside', mockOnClickOutside);

describe('UiDropdown', () => {
  it('should render with default props', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: '<div>Content</div>',
      },
    });

    expect(wrapper.find('.relative.inline-block.text-left').exists()).toBe(true);
    expect(wrapper.find('button').text()).toBe('Toggle');
  });

  it('should be closed by default', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: '<div>Content</div>',
      },
    });

    // Dropdown should not be visible initially
    const dropdown = wrapper.find('[class*="absolute z-50"]');
    expect(dropdown.attributes('style')).toContain('display: none');
  });

  it('should toggle dropdown when trigger is clicked', async () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: '<div>Content</div>',
      },
    });

    const trigger = wrapper.find('button');
    
    // Click to open
    await trigger.trigger('click');
    
    const dropdown = wrapper.find('[class*="absolute z-50"]');
    const styleAttr = dropdown.attributes('style');
    if (styleAttr) {
      expect(styleAttr).not.toContain('display: none');
    } else {
      // If no style attribute, the element should be visible
      expect(dropdown.exists()).toBe(true);
    }
  });

  it('should apply correct placement classes', () => {
    const placements = [
      { placement: 'bottom-left', expectedClass: 'left-0 mt-2 origin-top-left' },
      { placement: 'bottom-right', expectedClass: 'right-0 mt-2 origin-top-right' },
      { placement: 'top-left', expectedClass: 'left-0 mb-2 bottom-full origin-bottom-left' },
      { placement: 'top-right', expectedClass: 'right-0 mb-2 bottom-full origin-bottom-right' },
    ] as const;

    placements.forEach(({ placement, expectedClass }) => {
      const wrapper = mount(UiDropdown, {
        props: { placement },
        slots: {
          trigger: '<button>Toggle</button>',
          default: '<div>Content</div>',
        },
      });

      const dropdown = wrapper.find('[class*="absolute z-50"]');
      expectedClass.split(' ').forEach(cls => {
        expect(dropdown.classes()).toContain(cls);
      });
    });
  });

  it('should apply correct width classes', () => {
    const widths = [
      { width: 'auto', expectedClass: 'w-auto' },
      { width: 'trigger', expectedClass: 'w-full min-w-[140px]' },
      { width: 'sm', expectedClass: 'w-48' },
      { width: 'md', expectedClass: 'w-56' },
      { width: 'lg', expectedClass: 'w-64' },
    ] as const;

    widths.forEach(({ width, expectedClass }) => {
      const wrapper = mount(UiDropdown, {
        props: { width },
        slots: {
          trigger: '<button>Toggle</button>',
          default: '<div>Content</div>',
        },
      });

      const dropdown = wrapper.find('[class*="absolute z-50"]');
      if (expectedClass.includes(' ')) {
        expectedClass.split(' ').forEach(cls => {
          expect(dropdown.classes()).toContain(cls);
        });
      } else {
        expect(dropdown.classes()).toContain(expectedClass);
      }
    });
  });

  it('should have base dropdown classes', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: '<div>Content</div>',
      },
    });

    const dropdown = wrapper.find('[class*="absolute z-50"]');
    const expectedClasses = [
      'absolute',
      'z-50',
      'bg-white',
      'border',
      'border-gray-200',
      'rounded-md',
      'shadow-lg',
      'ring-1',
      'ring-black',
      'ring-opacity-5',
      'focus:outline-none',
    ];

    expectedClasses.forEach(cls => {
      expect(dropdown.classes()).toContain(cls);
    });
  });

  it('should provide trigger slot props', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: `
          <template #trigger="{ isOpen, toggle }">
            <button @click="toggle">
              {{ isOpen ? 'Close' : 'Open' }}
            </button>
          </template>
        `,
        default: '<div>Content</div>',
      },
    });

    const button = wrapper.find('button');
    expect(button.text()).toBe('Open');
  });

  it('should provide close function to default slot', async () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: `
          <template #default="{ close }">
            <button @click="close">Close Me</button>
          </template>
        `,
      },
    });

    // Open dropdown first
    await wrapper.find('button').trigger('click');

    // Find the close button and click it
    const closeButton = wrapper.findAll('button')[1];
    await closeButton.trigger('click');

    const dropdown = wrapper.find('[class*="absolute z-50"]');
    expect(dropdown.attributes('style')).toContain('display: none');
  });

  it('should apply content classes to inner container', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: '<div>Content</div>',
      },
    });

    const contentContainer = wrapper.find('.py-1');
    expect(contentContainer.exists()).toBe(true);
  });

  it('should initialize properly without errors', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button>Toggle</button>',
        default: '<div>Content</div>',
      },
    });

    // Just test that the component mounts without issues
    expect(wrapper.exists()).toBe(true);
  });

  it('should render complex slot content', () => {
    const wrapper = mount(UiDropdown, {
      slots: {
        trigger: '<button class="trigger-btn">Menu</button>',
        default: `
          <div class="menu-items">
            <a href="/profile" class="menu-item">Profile</a>
            <a href="/settings" class="menu-item">Settings</a>
            <button class="menu-item danger">Logout</button>
          </div>
        `,
      },
    });

    expect(wrapper.find('.trigger-btn').exists()).toBe(true);
    expect(wrapper.find('.menu-items').exists()).toBe(true);
    expect(wrapper.findAll('.menu-item')).toHaveLength(3);
  });
});