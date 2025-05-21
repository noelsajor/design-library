import React from 'react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

export type Step = {
  label: string;
  state: 'completed' | 'active' | 'upcoming';
};

interface StepperProps {
  steps: Step[];
  style?: React.CSSProperties;
}

const getStepColor = (state: Step['state']) => {
  switch (state) {
    case 'completed':
      return COLORS.teal;
    case 'active':
      return COLORS.navyBlue;
    default:
      return COLORS.lightSilver;
  }
};

const Stepper: React.FC<StepperProps> = ({ steps, style }) => {
  return (
    <nav aria-label="Progress" style={{ width: '100%', ...style }}>
      <ol style={{
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
        gap: 0,
        height: 56,
      }}>
        {steps.map((step, idx) => {
          const isCompleted = step.state === 'completed';
          const isActive = step.state === 'active';
          const circleColor = getStepColor(step.state);
          const textColor = isCompleted ? COLORS.teal : isActive ? COLORS.navyBlue : COLORS.silver;
          return (
            <React.Fragment key={step.label}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
                <div
                  aria-current={isActive ? 'step' : undefined}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: isCompleted ? COLORS.teal : isActive ? COLORS.navyBlue : COLORS.white,
                    border: `2.5px solid ${circleColor}`,
                    color: isCompleted || isActive ? COLORS.white : COLORS.navyBlue,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 18,
                    marginLeft: idx === 0 ? 36 : 0,
                    marginRight: 0,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                >
                  {isCompleted ? '✓' : idx + 1}
                </div>
                <span
                  style={{
                    ...TYPOGRAPHY.bodyExtraSmallXS,
                    color: textColor,
                    fontWeight: isActive ? 700 : 600,
                    whiteSpace: 'nowrap',
                    letterSpacing: 0.2,
                  }}
                >
                  {step.label}
                </span>
              </li>
              {idx < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  style={{
                    flex: 1,
                    height: 3,
                    background: steps[idx + 1].state === 'completed' || steps[idx].state === 'completed' ? COLORS.teal : COLORS.lightSilver,
                    margin: '0 18px',
                    borderRadius: 2,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Stepper;
