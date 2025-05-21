import React, { useState } from 'react';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';
import DashboardPage from './DashboardPage';
import { COLORS } from './colors';
import { SPACING } from './spacing';
import { TYPOGRAPHY } from './typography';

function DetailsModal({ request, onClose }: { request: any, onClose: () => void }) {
  if (!request) return null;
  return (
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
      <div style={{
        background: '#fff',
        borderRadius: 8,
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        minWidth: 400,
        maxWidth: 520,
        padding: 32,
        position: 'relative',
        border: '2px solid #e0e0e0',
        color: '#222', // Ensure all text is visible
        fontSize: 17,
        fontWeight: 400,
        lineHeight: 1.6,
      }}>
        <h2 style={{ margin: 0, marginBottom: 16, color: '#126080', fontWeight: 700, fontSize: 26 }}>Request Details</h2>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>ID:</strong> {request.id}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Title:</strong> {request.title}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Status:</strong> {request.status}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Owner:</strong> {request.owner}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Department:</strong> {request.department}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Created:</strong> {request.created}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Priority:</strong> {request.priority}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Description:</strong> {request.description}</div>
        {/* Extra fake details */}
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Last Updated:</strong> 2025-05-18</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Assigned To:</strong> {request.owner === 'John Doe' ? 'IT Team' : 'Support Staff'}</div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Attachments:</strong> <a href="#" style={{ color: '#126080', textDecoration: 'underline' }}>View file.pdf</a></div>
        <div style={{ marginBottom: 12, color: '#333' }}><strong>Comments:</strong> {request.status === 'Warning' ? 'Requires urgent attention.' : 'No comments.'}</div>
        <button onClick={onClose} style={{ marginTop: 18, padding: '8px 18px', borderRadius: 4, background: '#126080', color: '#fff', border: 'none', fontWeight: 500, fontSize: 16, cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}

const AllRequestsTablePage: React.FC = () => {
  const [detailsRequest, setDetailsRequest] = useState<any>(null);

  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column', }}>
        <Breadcrumb items={[
          { label: 'Design Library', to: '/design-library/' },
          { label: 'Dashboard', to: '/design-library/dashboard' },
          { label: 'All Requests' }
        ]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left' }}>All Requests</h1>
        <DashboardPage showOnlyTable setDetailsRequest={setDetailsRequest} />
        {detailsRequest && <DetailsModal request={detailsRequest} onClose={() => setDetailsRequest(null)} />}
      </main>
    </div>
  );
};

export default AllRequestsTablePage;
