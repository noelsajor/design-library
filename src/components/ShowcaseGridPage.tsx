import React from 'react';
import Card, { LayoutGrid } from './Card';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import Button from './Button';

const cardData = [
  {
    title: 'Design System',
    content: 'Reusable components for rapid UI development.',
    color: COLORS.navyBlue,
  },
  {
    title: 'Figma Migration',
    content: 'Migrate designs from Figma to code.',
    color: COLORS.teal,
  },
  {
    title: 'Responsive Grid',
    content: 'Showcase cards in a flexible 4-column layout.',
    color: COLORS.atlanticBlue,
  },
  {
    title: 'Accessibility',
    content: 'All components are accessible and keyboard-friendly.',
    color: COLORS.elBosqueGreen,
  },
  {
    title: 'Theming',
    content: 'Consistent colors, typography, and spacing.',
    color: COLORS.sangriaRed,
  },
  {
    title: 'Rapid Iteration',
    content: 'Empower designers to iterate quickly.',
    color: COLORS.bananaYellow,
  },
  {
    title: 'Deploy to GitHub Pages',
    content: 'Easily share your design system online.',
    color: COLORS.gunmetal,
  },
];

const ShowcaseGridPage: React.FC = () => {
  return (
    <div
      style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: SPACING.xl,
        boxSizing: 'border-box',
      }}
    >
      <h1 style={{ ...TYPOGRAPHY.titleDefault, marginBottom: SPACING.xl, color: COLORS.navyBlue, textAlign: 'center' }}>
        4-Column Responsive Card Grid
      </h1>
      <LayoutGrid>
        {cardData.map((card, idx) => (
          <Card
            key={idx}
            title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: card.color }}>{card.title}</span>}
            footer={<Button label="Learn More" type="hot" size="default" />}
            style={{ minHeight: 180, margin: 0 }}
          >
            <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>{card.content}</div>
          </Card>
        ))}
      </LayoutGrid>
    </div>
  );
};

export default ShowcaseGridPage;
