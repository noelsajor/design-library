import React from 'react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';
import { Button } from './index';
import { useNavigate } from 'react-router-dom';

interface WarningMessageModalProps {
  onCancel: () => void;
  onContinue: () => void;
}

const WarningMessageModal: React.FC<WarningMessageModalProps> = ({
  onCancel,
  onContinue,
}) => {
  const navigate = useNavigate();
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
        }}>See our demo app?</div>
        <div style={{
          ...TYPOGRAPHY.bodyBigL,
          color: COLORS.gunmetal,
          marginBottom: SPACING.lg,
          whiteSpace: 'normal', // Allow multi-line
          overflow: 'visible',
          textOverflow: 'clip',
        }}>You can keep scrolling here our just migrated Design library made with React + Vite and Copilot or take a look to these components in action in our live demo app.</div>
        <div style={{
          ...TYPOGRAPHY.bodySmallSM,
          color: COLORS.slateGray,
          background: COLORS.lightSilver,
          borderRadius: 3,
          padding: '10px 14px',
          marginBottom: SPACING.lg,
        }}>
          <strong>Note:</strong> This modal (and the library) was migrated directly from Figma, demonstrating how quickly Figma designs can be turned into reusable React components.
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: SPACING.md,
        }}>
          <Button label="Visit demo app" type="default" onClick={() => {
            navigate('/design-library/dashboard');
            onCancel();
          }} hideIcons size="default" />
          <Button label="Continue" type="hot" onClick={onContinue} hideIcons size="default" />
        </div>
      </div>
    </div>
  );
};

export default WarningMessageModal;
