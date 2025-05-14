import React from 'react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { Button } from './index';

interface WarningMessageModalProps {
  onCancel: () => void;
  onContinue: () => void;
}

const WarningMessageModal: React.FC<WarningMessageModalProps> = ({
  onCancel,
  onContinue,
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0,0,0,0.04)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: COLORS.white,
        borderRadius: 4, // Set modal card border radius to 4px to match button
        boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
        minWidth: 480,
        maxWidth: 600,
        padding: 24, // Set card padding to 24px as requested
        display: 'flex',
        flexDirection: 'column',
        gap: `${SPACING.md}px`,
        position: 'relative',
        border: `1.5px solid ${COLORS.lightSilver}`,
        textAlign: 'left',
      }}>
        <div style={{
          ...TYPOGRAPHY.titleDefault,
          color: COLORS.slateGray,
          marginBottom: 12, // Set space between title and content to 12px
          marginTop: SPACING.xl,
          whiteSpace: 'normal', // Allow multi-line
          overflow: 'visible',
          textOverflow: 'clip',
        }}>Optional short title</div>
        <div style={{
          ...TYPOGRAPHY.bodyBigL,
          color: COLORS.gunmetal,
          marginBottom: SPACING.lg,
          whiteSpace: 'normal', // Allow multi-line
          overflow: 'visible',
          textOverflow: 'clip',
        }}>Include: the reason for the warning and the potential problem, how someone should act, and what happens if they don’t act.<br /><br />Keep messages to 1 to 2 sentences.</div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: SPACING.md,
        }}>
          <Button label="Cancel" type="default" onClick={onCancel} hideIcons size="default" />
          <Button label="Continue" type="hot" onClick={onContinue} hideIcons size="default" />
        </div>
      </div>
    </div>
  );
};

export default WarningMessageModal;
