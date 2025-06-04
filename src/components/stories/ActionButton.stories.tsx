import type { Meta, StoryObj } from '@storybook/react';
import ActionButton from '../ActionButton.tsx';

const meta: Meta<typeof ActionButton> = {
  title: 'Design System/ActionButton',
  component: ActionButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { control: { type: 'radio' }, options: ['default', 'narrow'] },
    type: { control: { type: 'radio' }, options: ['default', 'danger', 'disabled'] },
    isHovered: { control: 'boolean' },
    isActive: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Botón de acción con iconos, variantes y tamaños. Ideal para menús y acciones rápidas.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Default: Story = {
  args: {
    label: 'Acción Default',
    size: 'default',
    type: 'default',
  },
};

export const Danger: Story = {
  args: {
    label: 'Acción Peligro',
    size: 'default',
    type: 'danger',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Acción Deshabilitada',
    size: 'default',
    type: 'disabled',
  },
};

export const Narrow: Story = {
  args: {
    label: 'Acción Estrecha',
    size: 'narrow',
    type: 'default',
  },
};
