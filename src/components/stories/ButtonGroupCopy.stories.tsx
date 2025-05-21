import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroupCopy from '../ButtonGroupCopy';
import { IconUser, IconChevronDown } from '@tabler/icons-react';

const meta: Meta<typeof ButtonGroupCopy> = {
  title: 'Design System/ButtonGroupCopy',
  component: ButtonGroupCopy,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'radio' }, options: ['default', 'narrow'] },
    buttons: { control: 'object' },
    hideRightIcons: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Grupo de botones usando el componente Button, soporta variantes, tamaños y ocultar iconos.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ButtonGroupCopy>;

export const Default: Story = {
  args: {
    size: 'default',
    hideRightIcons: false,
    buttons: [
      { label: 'Default', type: 'default' },
      { label: 'Hot', type: 'hot' },
      { label: 'Danger', type: 'danger' },
      { label: 'Disabled', type: 'disabled' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    size: 'default',
    hideRightIcons: false,
    buttons: [
      { label: 'Usuario', type: 'default', leftIcon: <IconUser size={24} /> },
      { label: 'Más', type: 'hot', leftIcon: <IconChevronDown size={24} /> },
      { label: 'Acción', type: 'danger' },
    ],
  },
};

export const Narrow: Story = {
  args: {
    size: 'narrow',
    hideRightIcons: false,
    buttons: [
      { label: 'Default', type: 'default' },
      { label: 'Hot', type: 'hot' },
      { label: 'Danger', type: 'danger' },
      { label: 'Disabled', type: 'disabled' },
    ],
  },
};

export const WithoutIcons: Story = {
  args: {
    size: 'default',
    hideRightIcons: true,
    buttons: [
      { label: 'Default', type: 'default' },
      { label: 'Hot', type: 'hot' },
      { label: 'Danger', type: 'danger' },
      { label: 'Disabled', type: 'disabled' },
    ],
  },
};
