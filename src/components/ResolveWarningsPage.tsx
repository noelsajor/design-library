import React, { useState } from 'react';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Button from './Button';
import Stepper from './Stepper';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

// Fake warning requests for demo
const warningRequests = [
  {
    id: 1004,
    title: 'Cafeteria Menu Update',
    status: 'Warning',
    owner: 'Bob Brown',
    department: 'Facilities',
    created: '2025-05-12',
    priority: 'Low',
    warning: 'Menu not approved by nutritionist.'
  },
  {
    id: 1009,
    title: 'Printer Repair',
    status: 'Warning',
    owner: 'Jane Smith',
    department: 'IT',
    created: '2025-05-11',
    priority: 'High',
    warning: 'Parts unavailable.'
  },
];

const tableHeaderStyle = {
  ...TYPOGRAPHY.bodySmallSM,
  color: COLORS.navyBlue,
  padding: '12px 16px',
  textAlign: 'left' as const,
  fontWeight: 700,
  fontSize: 15,
  textShadow: '0 1px 2px #fff, 0 0 2px #12608044',
};
const tableCellStyle = {
  padding: '12px 16px',
  color: '#1a1a1a',
  fontWeight: 400,
  fontSize: 15,
  textShadow: '0 1px 2px #fff, 0 0 2px #12608022',
};

const ResolveWarningsPage: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [wizardStep, setWizardStep] = useState<number>(0);
  const [success, setSuccess] = useState<boolean>(false);
  const [completedWarnings, setCompletedWarnings] = useState<any[]>([]);
  const [warnings, setWarnings] = useState(warningRequests);

  // Handler for starting the wizard
  const handleResolveClick = (req: any) => {
    setSelected(req);
    setWizardStep(0);
    setSuccess(false);
  };

  // Handler for wizard next
  const handleNext = () => {
    if (wizardStep < wizardSteps.length - 1) {
      setWizardStep(wizardStep + 1);
    } else {
      setSuccess(true);
      // Move resolved warning to completed
      if (selected) {
        setTimeout(() => {
          setWarnings((prev: any[]) => prev.filter(w => w.id !== selected.id));
          setCompletedWarnings((prev: any[]) => [...prev, selected]);
          setSelected(null);
        }, 1200); // Give user time to see the success message
      }
    }
  };

  // Handler for wizard back
  const handleBack = () => {
    if (wizardStep > 0) setWizardStep(wizardStep - 1);
  };

  // Handler for closing modal
  const handleClose = () => {
    setSelected(null);
    setWizardStep(0);
    setSuccess(false);
  };

  // Wizard steps content
  const wizardSteps = [
    {
      title: 'Review Warning',
      content: (
        <div style={{ fontSize: 18, color: '#1a2233', marginBottom: 18 }}>
          <p><b>Warning:</b> {selected?.warning}</p>
          <p>Please review the warning details before proceeding to resolve it.</p>
        </div>
      )
    },
    {
      title: 'Take Action',
      content: (
        <div style={{ fontSize: 18, color: '#1a2233', marginBottom: 18 }}>
          <p>Take the necessary action to resolve this warning. (This is a demo step.)</p>
          <ul style={{ marginLeft: 20 }}>
            <li>Contact the responsible department if required.</li>
            <li>Update documentation or records as needed.</li>
            <li>Confirm all information is correct.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Confirm Resolution',
      content: (
        <div style={{ fontSize: 18, color: '#1a2233', marginBottom: 18 }}>
          <p>Are you sure you want to mark this warning as resolved?</p>
        </div>
      )
    }
  ];

  // Stepper steps config
  const stepperSteps = wizardSteps.map((step, idx) => {
    let state: 'completed' | 'active' | 'upcoming' = 'upcoming';
    if (wizardStep > idx) state = 'completed';
    else if (wizardStep === idx) state = 'active';
    return { label: step.title, state };
  });

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb items={[
          { label: 'Design Library', to: '/design-library/' },
          { label: 'Dashboard', to: '/design-library/dashboard' },
          { label: 'Resolve Warnings' }
        ]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left', textShadow: '0 2px 8px #fff' }}>Resolve Warnings</h1>
        <div style={{ background: COLORS.white, borderRadius: 12, boxShadow: '0 2px 12px rgba(18,96,128,0.07)', padding: 32, marginBottom: 32, border: `1.5px solid ${COLORS.lightSilver}` }}>
          <h2 style={{ ...TYPOGRAPHY.titleDefault, color: COLORS.navyBlue, margin: '0 0 24px 0', fontSize: 24, fontWeight: 400, padding: 0, textShadow: 'none', letterSpacing: 0.2, textAlign: 'left' }}>Requests with Warnings</h2>
          <table style={{ width: '100%', minWidth: 700, borderCollapse: 'separate', borderSpacing: 0, background: COLORS.white, overflow: 'hidden', boxShadow: 'none' }}>
            <thead>
              <tr style={{ background: COLORS.almostWhite, borderBottom: `2px solid ${COLORS.lightSilver}` }}>
                <th style={tableHeaderStyle}>ID</th>
                <th style={tableHeaderStyle}>Title</th>
                <th style={tableHeaderStyle}>Status</th>
                <th style={tableHeaderStyle}>Owner</th>
                <th style={tableHeaderStyle}>Department</th>
                <th style={tableHeaderStyle}>Created</th>
                <th style={tableHeaderStyle}>Priority</th>
                <th style={tableHeaderStyle}>Warning</th>
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {warnings.map((req, idx) => (
                <tr key={req.id} style={{ background: idx % 2 === 0 ? COLORS.white : COLORS.almostWhite, borderBottom: `1.5px solid ${COLORS.lightSilver}` }}>
                  <td style={tableCellStyle}>{req.id}</td>
                  <td style={tableCellStyle}>{req.title}</td>
                  <td style={{ ...tableCellStyle, color: '#b97a00', fontWeight: 700 }}>{req.status}</td>
                  <td style={tableCellStyle}>{req.owner}</td>
                  <td style={tableCellStyle}>{req.department}</td>
                  <td style={tableCellStyle}>{req.created}</td>
                  <td style={tableCellStyle}>{req.priority}</td>
                  <td style={{ ...tableCellStyle, color: '#b97a00', fontWeight: 600 }}>{req.warning}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 700 }}>
                    <Button label="Resolve" type="hot" size="narrow" hideIcons onClick={() => handleResolveClick(req)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Wizard Modal */}
        {selected && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.18)',
            zIndex: 2100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}>
            <div style={{ minWidth: 900, maxWidth: 1100, width: 950, borderRadius: 18, boxShadow: '0 12px 48px rgba(18,96,128,0.18)', background: COLORS.white, border: `2px solid ${COLORS.lightSilver}`, padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
              {/* Stepper Bar (replaced with Stepper component) */}
              {!success && (
                <Stepper steps={stepperSteps} currentStep={wizardStep} style={{ marginBottom: 0 }} />
              )}
              {/* Modal Header */}
              <div style={{ background: COLORS.white, padding: '32px 48px 0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                <h2 style={{ color: COLORS.navyBlue, fontWeight: 900, fontSize: 32, margin: 0, letterSpacing: 0.2, lineHeight: 1.2 }}>{success ? 'Warning Resolved!' : wizardSteps[wizardStep].title}</h2>
                <Button label="×" type="default" size="narrow" hideIcons onClick={handleClose} />
              </div>
              {/* Modal Body */}
              <div style={{ width: '100%', minHeight: 340, padding: '0 48px 36px 48px', display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 0, boxSizing: 'border-box', overflowY: 'auto', maxHeight: 520 }}>
                {!success ? (
                  <>
                    <div style={{ width: '100%', margin: '32px 0 24px 0', minHeight: 70, display: 'flex', alignItems: 'flex-start', overflowY: 'auto', maxHeight: 220 }}>{wizardSteps[wizardStep].content}</div>
                    {/* Wizard actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 24, gap: 16 }}>
                      {wizardStep !== 0 && (
                        <Button label="Back" type="default" size="narrow" hideIcons onClick={handleBack} />
                      )}
                      <Button label={wizardStep === wizardSteps.length - 1 ? 'Finish' : 'Next'} type="hot" size="narrow" hideIcons onClick={handleNext} />
                      <Button label="Cancel" type="default" size="narrow" hideIcons onClick={handleClose} />
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220, width: '100%' }}>
                    <div style={{ fontSize: 48, color: '#1bbf5c', marginBottom: 18 }}>✔️</div>
                    <h2 style={{ color: COLORS.navyBlue, fontWeight: 900, fontSize: 28, marginBottom: 12 }}>Warning Resolved!</h2>
                    <p style={{ fontSize: 18, color: '#1a2233', marginBottom: 18, textAlign: 'center' }}>The warning has been successfully resolved and marked as complete.</p>
                    <Button label="Close" type="hot" size="narrow" hideIcons onClick={handleClose} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ResolveWarningsPage;