import React, { useState } from 'react';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Button from './Button';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

// Fake in-progress requests for demo
// Add a type for the log entry
interface StatusLogEntry {
  timestamp: string;
  oldStatus: string;
  newStatus: string;
}

// Add a status log to each request (for demo, just for the first one)
const inProgressRequests = [
  {
    id: 2001,
    title: 'Network Upgrade',
    owner: 'Alice Lee',
    department: 'IT',
    created: '2025-05-10',
    priority: 'High',
    progress: 60,
    status: 'In Progress',
    description: 'Upgrade office WiFi and switches.',
    statusLog: [
      { timestamp: '2025-05-10 09:00', oldStatus: 'Open', newStatus: 'In Progress' },
      { timestamp: '2025-05-11 14:30', oldStatus: 'In Progress', newStatus: 'Paused' },
      { timestamp: '2025-05-12 10:00', oldStatus: 'Paused', newStatus: 'In Progress' },
    ]
  },
  {
    id: 2002,
    title: 'HVAC Maintenance',
    owner: 'Bob Brown',
    department: 'Facilities',
    created: '2025-05-09',
    priority: 'Medium',
    progress: 30,
    status: 'In Progress',
    description: 'Quarterly HVAC system check.',
  },
  {
    id: 2003,
    title: 'Website Redesign',
    owner: 'Jane Smith',
    department: 'IT',
    created: '2025-05-12',
    priority: 'High',
    progress: 80,
    status: 'In Progress',
    description: 'Redesign the company website for better UX.',
  },
];

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div style={{ background: '#eee', borderRadius: 6, height: 10, width: '100%', marginTop: 6 }}>
      <div style={{ width: `${percent}%`, background: '#126080', height: 10, borderRadius: 6, transition: 'width 0.3s' }} />
    </div>
  );
}

// const cellTextStyle = {
//   color: COLORS.navyBlue,
//   fontWeight: 600,
//   fontSize: 18,
//   letterSpacing: 0.2,
//   textShadow: '0 1px 0 #fff',
// };

const tableHeaderStyle = {
  ...TYPOGRAPHY.bodySmallSM,
  color: COLORS.navyBlue,
  padding: '12px 8px',
  textAlign: 'left' as const,
  fontWeight: 700,
  fontSize: 17,
  textShadow: '0 1px 2px #fff, 0 0 2px #12608044',
};
const tableCellStyle = {
  padding: '12px 8px',
  color: '#1a1a1a',
  fontWeight: 500,
  fontSize: 17,
  textShadow: '0 1px 2px #fff, 0 0 2px #12608022',
};

const TrackInProgressPage: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [log, setLog] = useState<StatusLogEntry[]>([]);
  // Wizard modal state
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [wizardSuccess, setWizardSuccess] = useState(false);

  // When a request is selected, set its status and log
  React.useEffect(() => {
    if (selected) {
      setStatus(selected.status);
      setLog(selected.statusLog || []);
    }
  }, [selected]);

  // Handler for status change
  const handleStatusChange = (newStatus: string) => {
    if (!selected) return;
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const entry = { timestamp, oldStatus: status || '', newStatus };
    setLog(prev => [...prev, entry]);
    setStatus(newStatus);
    setSelected({ ...selected, status: newStatus, statusLog: [...log, entry] });
  };

  // Wizard steps content
  const wizardSteps = [
    {
      title: 'Review Issue',
      content: (
        <div style={{ fontSize: 18, color: '#1a2233', marginBottom: 18 }}>
          <p><b>Request:</b> {selected?.title}</p>
          <p><b>Description:</b> {selected?.description}</p>
          <p>Please review the issue details before proceeding to resolve it.</p>
        </div>
      )
    },
    {
      title: 'Take Action',
      content: (
        <div style={{ fontSize: 18, color: '#1a2233', marginBottom: 18 }}>
          <p>Take the necessary action to resolve this request. (This is a demo step.)</p>
          <ul style={{ marginLeft: 20 }}>
            <li>Check the request status and update as needed.</li>
            <li>Contact the assigned team if required.</li>
            <li>Confirm all information is correct.</li>
          </ul>
        </div>
      )
    },
    {
      title: 'Confirm Resolution',
      content: (
        <div style={{ fontSize: 18, color: '#1a2233', marginBottom: 18 }}>
          <p>Are you sure you want to mark this request as resolved?</p>
        </div>
      )
    }
  ];

  const handleWizardNext = () => {
    if (wizardStep < wizardSteps.length - 1) {
      setWizardStep(wizardStep + 1);
    } else {
      // Final step: mark as resolved and show success
      handleStatusChange('Resolved');
      setWizardSuccess(true);
    }
  };
  const handleWizardBack = () => {
    if (wizardStep > 0) setWizardStep(wizardStep - 1);
  };
  const handleWizardClose = () => {
    setWizardOpen(false);
    setWizardStep(0);
    setWizardSuccess(false);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb items={[
          { label: 'Design Library', to: '/design-library/' },
          { label: 'Dashboard', to: '/design-library/dashboard' },
          { label: 'Track In Progress' }
        ]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left', textShadow: '0 2px 8px #fff' }}>Track In Progress</h1>
        <div style={{ background: COLORS.white, borderRadius: 12, boxShadow: '0 2px 12px rgba(18,96,128,0.07)', padding: 32, marginBottom: 32, border: `1.5px solid ${COLORS.lightSilver}` }}>
          <h2 style={{ ...TYPOGRAPHY.titleDefault, color: COLORS.navyBlue, margin: '0 0 24px 0', fontSize: 28, fontWeight: 400, padding: 0, textShadow: 'none', letterSpacing: 0.2, textAlign: 'left' }}>In Progress Requests</h2>
          <table style={{ width: '100%', minWidth: 700, borderCollapse: 'separate', borderSpacing: 0, background: COLORS.white,  overflow: 'hidden', boxShadow: 'none' }}>
            <thead>
              <tr style={{ background: COLORS.almostWhite, borderBottom: `2px solid ${COLORS.lightSilver}` }}>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>ID</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Title</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Owner</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Department</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Created</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Priority</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Progress</th>
                <th style={{ ...tableHeaderStyle, padding: '12px 16px', fontSize: 15, fontWeight: 700, textAlign: 'left' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {inProgressRequests.map((req, idx) => (
                <tr key={req.id} style={{ background: idx % 2 === 0 ? COLORS.white : COLORS.almostWhite, borderBottom: `1.5px solid ${COLORS.lightSilver}` }}>
                  <td style={{ ...tableCellStyle, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}>{req.id}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}>{req.title}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}>{req.owner}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}>{req.department}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}>{req.created}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}>{req.priority}</td>
                  <td style={{ ...tableCellStyle, minWidth: 120, fontWeight: 400, padding: '12px 16px', textAlign: 'left' }}><ProgressBar percent={req.progress} /></td>
                  <td style={{ ...tableCellStyle, fontWeight: 700, padding: '12px 16px', textAlign: 'left' }}>
                    <Button label="Details" type="default" size="narrow" hideIcons onClick={() => setSelected(req)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Details Modal */}
        {selected && !wizardOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.12)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(18,96,128,0.13)', minWidth: 420, maxWidth: 540, padding: 36, position: 'relative', border: '2px solid #e0e0e0', color: '#1a2233', fontSize: 18, fontWeight: 500, lineHeight: 1.7, textShadow: '0 1px 2px #fff, 0 0 2px #12608022' }}>
              <h2 style={{ margin: 0, marginBottom: 24, color: '#126080', fontWeight: 900, fontSize: 30, textShadow: '0 2px 8px #fff, 0 0 2px #12608044', letterSpacing: 0.2, lineHeight: 1.2 }}>Track Request Progress</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>ID:</span>
                  <span style={{ fontWeight: 600 }}>{selected.id}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Title:</span>
                  <span style={{ fontWeight: 600 }}>{selected.title}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Status:</span>
                  <span style={{ fontWeight: 600 }}>{status}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Owner:</span>
                  <span style={{ fontWeight: 600 }}>{selected.owner}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Department:</span>
                  <span style={{ fontWeight: 600 }}>{selected.department}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Created:</span>
                  <span style={{ fontWeight: 600 }}>{selected.created}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Priority:</span>
                  <span style={{ fontWeight: 600 }}>{selected.priority}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Description:</span>
                  <span style={{ fontWeight: 600 }}>{selected.description}</span>
                </div>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Progress:</span>
                  <span style={{ fontWeight: 600, minWidth: 120 }}><ProgressBar percent={selected.progress} /></span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Last Updated:</span>
                  <span style={{ fontWeight: 600 }}>2025-05-19</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Assigned To:</span>
                  <span style={{ fontWeight: 600 }}>{selected.owner === 'Alice Lee' ? 'IT Team' : 'Support Staff'}</span>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <span style={{ minWidth: 90, color: '#126080', fontWeight: 700 }}>Comments:</span>
                  <span style={{ fontWeight: 600 }}>{selected.progress < 50 ? 'Work in early stages.' : 'On track.'}</span>
                </div>
              </div>
              {/* Status Change Log */}
              <div style={{ margin: '32px 0 0 0' }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#126080', marginBottom: 10, letterSpacing: 0.1 }}>Status Change Log</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15, background: '#f8fafc', borderRadius: 6, overflow: 'hidden' }}>
                  <thead>
                    <tr style={{ background: COLORS.almostWhite }}>
                      <th style={{ padding: '8px 10px', textAlign: 'left', color: COLORS.navyBlue, fontWeight: 700, fontSize: 15 }}>Timestamp</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', color: COLORS.navyBlue, fontWeight: 700, fontSize: 15 }}>From</th>
                      <th style={{ padding: '8px 10px', textAlign: 'left', color: COLORS.navyBlue, fontWeight: 700, fontSize: 15 }}>To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.length === 0 && (
                      <tr><td colSpan={3} style={{ color: '#888', fontStyle: 'italic', padding: 10 }}>No status changes yet.</td></tr>
                    )}
                    {log.map((entry, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : COLORS.almostWhite }}>
                        <td style={{ padding: '8px 10px' }}>{entry.timestamp}</td>
                        <td style={{ padding: '8px 10px' }}>{entry.oldStatus}</td>
                        <td style={{ padding: '8px 10px' }}>{entry.newStatus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button onClick={() => setSelected(null)} style={{ marginTop: 28, padding: '10px 28px', borderRadius: 6, background: '#126080', color: '#fff', border: 'none', fontWeight: 800, fontSize: 18, cursor: 'pointer', textShadow: '0 1px 2px #fff, 0 0 2px #12608044', letterSpacing: 0.1 }}>Close</button>
            </div>
          </div>
        )}
        {/* Wizard Modal */}
        {wizardOpen && selected && (
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
          }}>
            <div style={{ minWidth: 420, maxWidth: 540, width: '100%', borderRadius: 14, boxShadow: '0 8px 32px rgba(18,96,128,0.18)', background: COLORS.white, border: `2px solid ${COLORS.lightSilver}`, padding: 0, position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Modal Header */}
              <div style={{ width: '100%', borderTopLeftRadius: 14, borderTopRightRadius: 14, background: COLORS.navyBlue, padding: '24px 36px 16px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ color: COLORS.white, fontWeight: 900, fontSize: 26, margin: 0, letterSpacing: 0.2, lineHeight: 1.2 }}>{wizardSuccess ? 'Request Resolved!' : 'Resolve Request'}</h2>
                <Button label="×" type="default" size="narrow" hideIcons onClick={handleWizardClose} />
              </div>
              {/* Stepper */}
              {!wizardSuccess && (
                <div style={{ width: '100%', background: '#f6f8fa', padding: '18px 36px 0 36px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
                  {wizardSteps.map((step, idx) => (
                    <div key={step.title} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: idx === wizardStep ? COLORS.navyBlue : '#e0e6ea',
                        color: idx === wizardStep ? COLORS.white : COLORS.navyBlue,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: 16,
                        border: idx < wizardStep ? `2px solid ${COLORS.navyBlue}` : '2px solid #e0e6ea',
                        transition: 'background 0.2s, color 0.2s',
                      }}>{idx + 1}</div>
                      <span style={{ color: idx === wizardStep ? COLORS.navyBlue : '#7a868f', fontWeight: idx === wizardStep ? 700 : 500, fontSize: 15 }}>{step.title}</span>
                      {idx < wizardSteps.length - 1 && (
                        <div style={{ width: 32, height: 2, background: idx < wizardStep ? COLORS.navyBlue : '#e0e6ea', borderRadius: 1 }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Modal Body */}
              <div style={{ width: '100%', padding: '32px 36px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {!wizardSuccess ? (
                  <>
                    <div style={{ width: '100%', marginBottom: 18 }}>{wizardSteps[wizardStep].content}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: 18 }}>
                      <div style={{ opacity: wizardStep === 0 ? 0.5 : 1, pointerEvents: wizardStep === 0 ? 'none' : 'auto' }}>
                        <Button label="Back" type="default" size="narrow" hideIcons onClick={handleWizardBack} />
                      </div>
                      <Button label={wizardStep === wizardSteps.length - 1 ? 'Finish' : 'Next'} type="hot" size="narrow" hideIcons onClick={handleWizardNext} />
                    </div>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 24 }}>
                      <Button label="Cancel" type="default" size="narrow" hideIcons onClick={handleWizardClose} />
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 220, width: '100%' }}>
                    <div style={{ fontSize: 48, color: '#1bbf5c', marginBottom: 18 }}>✔️</div>
                    <h2 style={{ color: COLORS.navyBlue, fontWeight: 900, fontSize: 28, marginBottom: 12 }}>Request Resolved!</h2>
                    <p style={{ fontSize: 18, color: '#1a2233', marginBottom: 18, textAlign: 'center' }}>The request has been successfully resolved and marked as complete.</p>
                    <Button label="Close" type="hot" size="narrow" hideIcons onClick={handleWizardClose} />
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

export default TrackInProgressPage;
