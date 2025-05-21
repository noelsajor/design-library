import React, { useState } from 'react';
import { IconUser, IconChevronDown } from '@tabler/icons-react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';

interface ButtonProps {
  label: string;
  size?: 'default' | 'narrow';
  type?: 'default' | 'hot' | 'danger' | 'disabled';
  // For showcase/demo only
  isHovered?: boolean;
  isActive?: boolean;
  onClick?: () => void; // Allow onClick for modal actions
  hideIcons?: boolean; // Hide icons for modal usage
  className?: string; // Allow custom className for style overrides
  style?: React.CSSProperties; // Allow custom inline style for grouped layouts
  grouped?: boolean; // New prop: disables internal border and borderRadius for seamless grouping
}

export const Button: React.FC<ButtonProps> = ({ label, size = 'default', type = 'default', isHovered: forcedHovered, isActive: forcedActive, onClick, hideIcons, className, style, grouped }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Use forced state if provided (for showcase)
  const effectiveHovered = forcedHovered !== undefined ? forcedHovered : isHovered;
  const effectiveActive = forcedActive !== undefined ? forcedActive : isActive;

  // Sizing
  const isNarrow = size === 'narrow';
  const fontStyle = isNarrow ? TYPOGRAPHY.buttonLabelS : TYPOGRAPHY.buttonLabel;
  const fontSize = fontStyle.fontSize;
  const fontWeight = fontStyle.fontWeight;
  const fontFamily = fontStyle.fontFamily;
  const padding = isNarrow ? `${SPACING.sm}px ${SPACING.sm}px` : `${SPACING.sm}px ${SPACING.md}px`;
  const minWidth = isNarrow ? '140px' : '160px'; // Default size min-width is now 160px
  const iconSize = isNarrow ? 22 : 32;
  const borderRadius = '4px'; // Set border radius to 4px for all button variants
  const contentGap = isNarrow ? `${SPACING.xs}px` : `${SPACING.sm}px`;

  // Color palette
  const palette = {
    default: {
      border: COLORS.navyBlue,
      text: COLORS.slateGray,
      icon: COLORS.slateGray,
      background: COLORS.white,
      hover: { border: COLORS.slateGray, text: COLORS.slateGray, icon: COLORS.slateGray, background: COLORS.lightSilver },
      active: { border: COLORS.navyBlue, text: COLORS.navyBlue, icon: COLORS.navyBlue, background: COLORS.lightSilver },
      disabled: { border: COLORS.almostWhite, text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite }
    },
    hot: {
      border: COLORS.darkTeal,
      text: COLORS.white,
      icon: COLORS.white,
      background: COLORS.darkTeal,
      hover: { border: COLORS.slateGray, text: COLORS.white, icon: COLORS.white, background: COLORS.slateGray },
      active: { border: COLORS.teal, text: COLORS.white, icon: COLORS.white, background: COLORS.teal },
      disabled: { border: COLORS.almostWhite, text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite }
    },
    danger: {
      border: COLORS.sangriaRed,
      text: COLORS.sangriaRed,
      icon: COLORS.sangriaRed,
      background: COLORS.white,
      hover: { border: COLORS.sangriaRed, text: COLORS.sangriaRed, icon: COLORS.sangriaRed, background: COLORS.lightSilver },
      active: { border: COLORS.candyRed, text: COLORS.white, icon: COLORS.white, background: COLORS.candyRed },
      disabled: { border: COLORS.almostWhite, text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite }
    },
    disabled: {
      border: COLORS.almostWhite,
      text: COLORS.silver,
      icon: COLORS.silver,
      background: COLORS.almostWhite,
      hover: { border: COLORS.almostWhite, text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
      active: { border: COLORS.almostWhite, text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
      disabled: { border: COLORS.almostWhite, text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite }
    }
  };

  // State logic
  const isBtnDisabled = type === 'disabled';
  let state: 'default' | 'hover' | 'active' | 'disabled' = 'default';
  if (isBtnDisabled) state = 'disabled';
  else if (effectiveActive) state = 'active';
  else if (effectiveHovered) state = 'hover';

  // Always get an object for colors
  const paletteType = palette[type as keyof typeof palette] || palette.default;
  let colors;
  if (state === 'default') colors = paletteType;
  else colors = paletteType[state];

  return (
    <button
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: contentGap,
        border: grouped ? 'none' : `2.5px solid ${colors.border}`,
        borderRadius: grouped ? undefined : borderRadius,
        background: colors.background,
        color: colors.text,
        fontSize,
        fontWeight,
        fontFamily,
        padding,
        boxSizing: 'border-box',
        cursor: isBtnDisabled ? 'not-allowed' : 'pointer',
        minWidth,
        justifyContent: hideIcons ? 'center' : 'flex-start',
        opacity: isBtnDisabled ? 0.7 : 1,
        transition: 'background 0.2s, border 0.2s, color 0.2s',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => !isBtnDisabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onMouseDown={() => !isBtnDisabled && setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={isBtnDisabled}
      data-state={state}
      data-size={size}
      data-type={type}
    >
      {!hideIcons && <IconUser size={iconSize} stroke={1.5} color={colors.icon} />}
      <span style={{ flex: 1, textAlign: hideIcons ? 'center' : 'left', color: colors.text, fontSize, fontWeight, fontFamily, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      {!hideIcons && <IconChevronDown size={iconSize} stroke={1.5} color={colors.icon} />}
    </button>
  );
};

export default Button;
