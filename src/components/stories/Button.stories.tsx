import type { Meta, StoryObj } from '@storybook/react';
import Button from '../Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    size: { control: { type: 'radio' }, options: ['default', 'narrow'] },
    type: { control: { type: 'radio' }, options: ['default', 'hot', 'danger', 'disabled'] },
    isHovered: { control: 'boolean' },
    isActive: { control: 'boolean' },
    hideIcons: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Botón principal del sistema de diseño. Soporta variantes, tamaños y estados.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Botón Default',
    size: 'default',
    type: 'default',
    hideIcons: false,
  },
};

export const Hot: Story = {
  args: {
    label: 'Botón Hot',
    size: 'default',
    type: 'hot',
    hideIcons: false,
  },
};

export const Danger: Story = {
  args: {
    label: 'Botón Danger',
    size: 'default',
    type: 'danger',
    hideIcons: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Botón Disabled',
    size: 'default',
    type: 'disabled',
    hideIcons: false,
  },
};

export const Narrow: Story = {
  args: {
    label: 'Botón Narrow',
    size: 'narrow',
    type: 'default',
    hideIcons: false,
  },
};

export const WithoutIcons: Story = {
  args: {
    label: 'Sin Iconos',
    size: 'default',
    type: 'default',
    hideIcons: true,
  },
};
