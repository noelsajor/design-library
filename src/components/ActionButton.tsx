import React, { useState } from 'react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { IconUser, IconChevronDown } from '@tabler/icons-react';

interface ActionButtonProps {
  label: string;
  size?: 'default' | 'narrow';
  type?: 'default' | 'danger' | 'disabled';
  isHovered?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  size = 'default',
  type = 'default',
  isHovered: forcedHovered,
  isActive: forcedActive,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const effectiveHovered = forcedHovered !== undefined ? forcedHovered : isHovered;
  const effectiveActive = forcedActive !== undefined ? forcedActive : isActive;

  const isNarrow = size === 'narrow';
  const fontStyle = isNarrow ? TYPOGRAPHY.buttonLabelS : TYPOGRAPHY.buttonLabel;
  const fontSize = fontStyle.fontSize;
  const fontWeight = fontStyle.fontWeight;
  const fontFamily = fontStyle.fontFamily;
  const padding = isNarrow ? `${SPACING.sm}px ${SPACING.sm}px` : `${SPACING.sm}px ${SPACING.md}px`;
  const minWidth = isNarrow ? '140px' : '160px';
  const borderRadius = '4px';
  const contentGap = isNarrow ? `${SPACING.xs}px` : `${SPACING.sm}px`;
  const iconSize = isNarrow ? 22 : 32;

  // Color palette for ActionButton
  const palette = {
    default: {
      text: COLORS.navyBlue,
      icon: COLORS.navyBlue,
      background: COLORS.white,
      hover: { text: COLORS.slateGray, icon: COLORS.slateGray, background: COLORS.lightSilver },
      active: { text: COLORS.white, icon: COLORS.white, background: COLORS.navyBlue },
      disabled: { text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
    },
    danger: {
      text: COLORS.sangriaRed,
      icon: COLORS.sangriaRed,
      background: COLORS.white,
      hover: { text: COLORS.white, icon: COLORS.white, background: COLORS.sangriaRed },
      active: { text: COLORS.white, icon: COLORS.white, background: COLORS.candyRed },
      disabled: { text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
    },
    disabled: {
      text: COLORS.silver,
      icon: COLORS.silver,
      background: COLORS.almostWhite,
      hover: { text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
      active: { text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
      disabled: { text: COLORS.silver, icon: COLORS.silver, background: COLORS.almostWhite },
    },
  };

  const isBtnDisabled = type === 'disabled';
  let state: 'default' | 'hover' | 'active' | 'disabled' = 'default';
  if (isBtnDisabled) state = 'disabled';
  else if (effectiveActive) state = 'active';
  else if (effectiveHovered) state = 'hover';

  const paletteType = palette[type as keyof typeof palette] || palette.default;
  let colors;
  if (state === 'default') colors = paletteType;
  else colors = paletteType[state];

  return (
    <button
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: contentGap,
        border: 'none', // No stroke for any variant
        borderRadius,
        background: colors.background,
        color: colors.text,
        fontSize,
        fontWeight,
        fontFamily,
        padding,
        boxSizing: 'border-box',
        cursor: isBtnDisabled ? 'not-allowed' : 'pointer',
        minWidth,
        justifyContent: 'center',
        opacity: isBtnDisabled ? 0.7 : 1,
        transition: 'background 0.2s, color 0.2s',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      onMouseEnter={() => !isBtnDisabled && setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsActive(false); }}
      onMouseDown={() => !isBtnDisabled && setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={isBtnDisabled}
      data-state={state}
      data-size={size}
      data-type={type}
      onClick={onClick}
    >
      <IconUser size={iconSize} stroke={1.5} color={colors.icon} />
      <span style={{ flex: 1, textAlign: 'center', color: colors.text, fontSize, fontWeight, fontFamily, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</span>
      <IconChevronDown size={iconSize} stroke={1.5} color={colors.icon} />
    </button>
  );
};

export default ActionButton;
