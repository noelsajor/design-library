import React from 'react';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional title for the card */
  title?: React.ReactNode;
  /** Optional content for the card */
  children?: React.ReactNode;
  /** Optional footer for the card */
  footer?: React.ReactNode;
  /** Optional image or media at the top */
  media?: React.ReactNode;
  /** Card width (default: 100%) */
  width?: string | number;
  /** Card minHeight (default: 120px) */
  minHeight?: string | number;
  /** Card padding (default: SPACING.lg) */
  padding?: string | number;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  footer,
  media,
  width = '100%',
  minHeight = 120,
  padding = SPACING.lg,
  style,
  ...rest
}) => {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1.5px solid ${COLORS.lightSilver}`,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        width: '100%', // Always 100% of grid cell
        maxWidth: typeof width === 'number' ? width : width || '100%', // Allow maxWidth override
        minWidth: 0, // Prevent overflow in grid
        minHeight,
        padding,
        display: 'flex',
        flexDirection: 'column',
        gap: SPACING.md,
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {media && (
        <div style={{ marginBottom: SPACING.sm }}>{media}</div>
      )}
      {title && (
        <div
          style={{
            ...TYPOGRAPHY.titleSmallSM,
            color: COLORS.navyBlue,
            marginBottom: SPACING.xs,
            fontWeight: 500,
            wordBreak: 'break-word',
          }}
        >
          {title}
        </div>
      )}
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
      {footer && (
        <div style={{ marginTop: SPACING.sm }}>{footer}</div>
      )}
    </div>
  );
};

function LayoutGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: SPACING.xl,
        width: '100%',
        padding: SPACING.lg,
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}

// Responsive horizontal button list template
function ButtonRow({ buttons }: { buttons: React.ReactNode[] }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: SPACING.md,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: `${SPACING.lg}px 0`,
      }}
    >
      {buttons.map((btn, idx) => (
        <div key={idx} style={{ flex: '1 1 160px', minWidth: 120, maxWidth: 240 }}>{btn}</div>
      ))}
    </div>
  );
}

export default Card;
export { LayoutGrid, ButtonRow };
