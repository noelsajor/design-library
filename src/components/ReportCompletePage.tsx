import React, { useState } from 'react';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import Button from './Button';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

// Fake completed requests for demo
const completedRequests = [
  {
    id: 1002,
    title: 'Office Supplies Restock',
    status: 'Completed',
    owner: 'Jane Smith',
    department: 'Admin',
    created: '2025-04-28',
    priority: 'Medium',
  },
  {
    id: 1006,
    title: 'Software License Renewal',
    status: 'Completed',
    owner: 'Alice Lee',
    department: 'IT',
    created: '2025-04-30',
    priority: 'High',
  },
  {
    id: 1010,
    title: 'Parking Lot Lighting',
    status: 'Completed',
    owner: 'Bob Brown',
    department: 'Facilities',
    created: '2025-05-02',
    priority: 'Medium',
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

const ReportCompletePage: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb items={[
          { label: 'Design Library', to: '/design-library/' },
          { label: 'Dashboard', to: '/design-library/dashboard' },
          { label: 'Report Complete' }
        ]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left', textShadow: '0 2px 8px #fff' }}>Completed Reports</h1>
        <div style={{ background: COLORS.white, borderRadius: 12, boxShadow: '0 2px 12px rgba(18,96,128,0.07)', padding: 32, marginBottom: 32, border: `1.5px solid ${COLORS.lightSilver}` }}>
          <h2 style={{ ...TYPOGRAPHY.titleDefault, color: COLORS.navyBlue, margin: '0 0 24px 0', fontSize: 24, fontWeight: 400, padding: 0, textShadow: 'none', letterSpacing: 0.2, textAlign: 'left' }}>All Completed Requests</h2>
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
                <th style={tableHeaderStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {completedRequests.map((req, idx) => (
                <tr key={req.id} style={{ background: idx % 2 === 0 ? COLORS.white : COLORS.almostWhite, borderBottom: `1.5px solid ${COLORS.lightSilver}` }}>
                  <td style={tableCellStyle}>{req.id}</td>
                  <td style={tableCellStyle}>{req.title}</td>
                  <td style={{ ...tableCellStyle, color: '#1a883a', fontWeight: 700 }}>{req.status}</td>
                  <td style={tableCellStyle}>{req.owner}</td>
                  <td style={tableCellStyle}>{req.department}</td>
                  <td style={tableCellStyle}>{req.created}</td>
                  <td style={tableCellStyle}>{req.priority}</td>
                  <td style={{ ...tableCellStyle, fontWeight: 700 }}>
                    <Button label="Details" type="default" size="narrow" hideIcons onClick={() => setSelected(req)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {selected && (
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
              <h2 style={{ margin: 0, marginBottom: 24, color: '#126080', fontWeight: 900, fontSize: 30, textShadow: '0 2px 8px #fff, 0 0 2px #12608044', letterSpacing: 0.2, lineHeight: 1.2 }}>Completed Request Details</h2>
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
                  <span style={{ fontWeight: 700, color: '#1a883a' }}>{selected.status}</span>
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
                    {selected.statusLog && selected.statusLog.length > 0 ? (
                      selected.statusLog.map((entry: any, i: number) => (
                        <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : COLORS.almostWhite }}>
                          <td style={{ padding: '8px 10px' }}>{entry.timestamp}</td>
                          <td style={{ padding: '8px 10px' }}>{entry.oldStatus}</td>
                          <td style={{ padding: '8px 10px' }}>{entry.newStatus}</td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan={3} style={{ color: '#888', fontStyle: 'italic', padding: 10 }}>No status changes yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <button onClick={() => setSelected(null)} style={{ marginTop: 28, padding: '10px 28px', borderRadius: 6, background: '#126080', color: '#fff', border: 'none', fontWeight: 800, fontSize: 18, cursor: 'pointer', textShadow: '0 1px 2px #fff, 0 0 2px #12608044', letterSpacing: 0.1 }}>Close</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ReportCompletePage;
