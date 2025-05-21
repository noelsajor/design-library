import { IconHome, IconChevronRight, IconBook, IconSettings } from '@tabler/icons-react';
import Breadcrumb from '../Breadcrumb';

export default {
  title: 'Design System/Breadcrumb',
  component: Breadcrumb,
};

export const Default = () => (
  <Breadcrumb
    items={[
      { label: 'Home', to: '/', icon: <IconHome size={16} /> },
      { label: 'Design Library', to: '/design-library', icon: <IconBook size={16} /> },
      { label: 'Components', to: '/design-library/components' },
      { label: 'Breadcrumb' },
    ]}
  />
);

export const SingleItem = () => (
  <Breadcrumb items={[{ label: 'Home', to: '/', icon: <IconHome size={16} /> }]} />
);

export const LongLabels = () => (
  <Breadcrumb
    items={[
      { label: 'Home', to: '/' },
      { label: 'A Very Long Section Name That Should Truncate', to: '/long-section' },
      { label: 'Another Long Label For Testing', to: '/another-long' },
      { label: 'Current Page With Long Name' },
    ]}
  />
);

export const ManyItems = () => (
  <Breadcrumb
    items={[
      { label: 'Home', to: '/' },
      { label: 'Level 1', to: '/l1' },
      { label: 'Level 2', to: '/l2' },
      { label: 'Level 3', to: '/l3' },
      { label: 'Level 4', to: '/l4' },
      { label: 'Level 5', to: '/l5' },
      { label: 'Current' },
    ]}
  />
);

export const CustomSeparator = () => (
  <Breadcrumb
    items={[
      { label: 'Home', to: '/', icon: <IconHome size={16} /> },
      { label: 'Settings', to: '/settings', icon: <IconSettings size={16} /> },
      { label: 'Profile' },
    ]}
    separator={<IconChevronRight size={16} />}
  />
);

export const Accessible = () => (
  <Breadcrumb
    items={[
      { label: 'Home', to: '/' },
      { label: 'Accessible Section', to: '/a11y' },
      { label: 'Current Page' },
    ]}
    ariaLabel="Breadcrumb Navigation"
  />
);
