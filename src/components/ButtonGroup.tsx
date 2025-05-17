import React from 'react';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';
import { IconChevronDown } from '@tabler/icons-react';

interface ButtonGroupProps {
  size?: 'default' | 'narrow';
  buttons: Array<{ label: string; onClick?: () => void; leftIcon?: React.ReactNode; }>;
  hideRightIcons?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ size = 'default', buttons, hideRightIcons }) => {
  const isNarrow = size === 'narrow';
  const fontStyle = isNarrow ? TYPOGRAPHY.buttonLabelS : TYPOGRAPHY.buttonLabel;
  const fontSize = fontStyle.fontSize;
  const fontWeight = fontStyle.fontWeight;
  const fontFamily = fontStyle.fontFamily;
  const padding = isNarrow ? `${SPACING.sm}px ${SPACING.sm}px` : `${SPACING.sm}px ${SPACING.md}px`;
  const minWidth = isNarrow ? '140px' : '160px';
  const borderRadius = '8px';
  const iconSize = isNarrow ? 22 : 32;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      border: `2px solid ${COLORS.navyBlue}`,
      borderRadius,
      background: COLORS.white,
      overflow: 'hidden',
      width: 'fit-content',
    }}>
      {buttons.map((btn, idx) => (
        <button
          key={btn.label + idx}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isNarrow ? SPACING.xs : SPACING.sm,
            border: 'none',
            borderRight: idx !== buttons.length - 1 ? `2px solid ${COLORS.navyBlue}` : 'none',
            background: COLORS.white,
            color: COLORS.gunmetal,
            fontSize,
            fontWeight,
            fontFamily,
            padding,
            minWidth,
            cursor: 'pointer',
            outline: 'none',
            borderRadius: idx === 0 ? `${borderRadius} 0 0 ${borderRadius}` : idx === buttons.length - 1 ? `0 ${borderRadius} ${borderRadius} 0` : '0',
            boxSizing: 'border-box',
            transition: 'background 0.2s, color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onClick={btn.onClick}
        >
          {btn.leftIcon && <span style={{ display: 'flex', alignItems: 'center' }}>{btn.leftIcon}</span>}
          <span style={{ flex: 1, textAlign: 'center', color: COLORS.gunmetal, fontSize, fontWeight, fontFamily }}>{btn.label}</span>
          {!hideRightIcons && <IconChevronDown size={iconSize} stroke={1.5} color={COLORS.gunmetal} />}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
