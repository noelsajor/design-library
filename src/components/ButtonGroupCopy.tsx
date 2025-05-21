import React from 'react';
import Button from './Button';
import { COLORS } from './colors';

interface ButtonGroupCopyProps {
  size?: 'default' | 'narrow';
  buttons: Array<{
    label: string;
    onClick?: () => void;
    leftIcon?: React.ReactNode;
    type?: 'default' | 'hot' | 'danger' | 'disabled';
    hideIcons?: boolean;
  }>;
  hideRightIcons?: boolean;
}

const ButtonGroupCopy: React.FC<ButtonGroupCopyProps> = ({ size = 'default', buttons, hideRightIcons }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      border: `2px solid ${COLORS.navyBlue}`,
      borderRadius: 8,
      background: COLORS.white,
      overflow: 'hidden',
      width: 'fit-content',
    }}>
      {buttons.map((btn, idx) => (
        <Button
          key={btn.label + idx}
          label={btn.label}
          size={size}
          type={btn.type}
          onClick={btn.onClick}
          hideIcons={btn.hideIcons ?? hideRightIcons}
          grouped // Enable grouped mode for seamless border/radius
          style={{
            borderRadius:
              idx === 0
                ? '8px 0 0 8px'
                : idx === buttons.length - 1
                ? '0 8px 8px 0'
                : '0',
            borderRight:
              idx !== buttons.length - 1 ? `2px solid ${COLORS.navyBlue}` : 'none',
            minWidth: size === 'narrow' ? '140px' : '160px',
            margin: 0,
            boxSizing: 'border-box',
            borderLeft: 'none',
            borderTop: 'none',
            borderBottom: 'none',
          }}
        />
      ))}
    </div>
  );
};

export default ButtonGroupCopy;
