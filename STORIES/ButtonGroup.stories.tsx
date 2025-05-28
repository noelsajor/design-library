import type { Meta, StoryObj } from '@storybook/react';
import ButtonGroup from '../src/components/ButtonGroup';
import { IconUser, IconChevronDown } from '@tabler/icons-react';

const meta: Meta<typeof ButtonGroup> = {
  title: 'STORIES/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'radio' }, options: ['default', 'narrow'] },
    buttons: { control: 'object' },
    hideRightIcons: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Grupo de botones alineados horizontalmente, con soporte para iconos y variantes.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Default: Story = {
  args: {
    size: 'default',
    hideRightIcons: false,
    buttons: [
      { label: 'Usuario', leftIcon: <IconUser size={24} /> },
      { label: 'Más', leftIcon: <IconChevronDown size={24} /> },
      { label: 'Acción' },
    ],
  },
};

export const Narrow: Story = {
  args: {
    size: 'narrow',
    hideRightIcons: false,
    buttons: [
      { label: 'Usuario', leftIcon: <IconUser size={20} /> },
      { label: 'Más', leftIcon: <IconChevronDown size={20} /> },
      { label: 'Acción' },
    ],
  },
};

export const WithoutRightIcons: Story = {
  args: {
    size: 'default',
    hideRightIcons: true,
    buttons: [
      { label: 'Usuario', leftIcon: <IconUser size={24} /> },
      { label: 'Más', leftIcon: <IconChevronDown size={24} /> },
      { label: 'Acción' },
    ],
  },
};
