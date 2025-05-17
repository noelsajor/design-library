import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Button from './components/Button';
import WarningMessageModal from './components/WarningMessageModal';
import { ActionButton, ButtonGroup } from './components';
import Card from './components/Card';
import { COLORS } from './components/colors';
import { TYPOGRAPHY } from './components/typography';
import { LayoutGrid, ButtonRow } from './components/Card';
import ShowcaseGridPage from './components/ShowcaseGridPage';
import NavBar from './components/NavBar';
import DashboardPage from './components/DashboardPage';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Breadcrumb from './components/Breadcrumb';
import { SPACING } from './components/spacing';

// Shared button state definitions
const BUTTON_STATES = [
  { label: 'Default', props: {} },
  { label: 'Hover', props: { isHovered: true } },
  { label: 'Active', props: { isActive: true } },
  { label: 'Disabled', props: { type: 'disabled' as const } },
];

// Shared button size definitions
const BUTTON_SIZES = [
  { label: 'Default', size: 'default' as const },
  { label: 'Narrow', size: 'narrow' as const },
];

// Button variants for Button component
const BUTTON_VARIANTS = [
  { label: 'Default', type: 'default' as const },
  { label: 'Hot', type: 'hot' as const },
  { label: 'Danger', type: 'danger' as const },
  { label: 'Disabled', type: 'disabled' as const },
];

// Button variants for ActionButton component
const ACTION_BUTTON_VARIANTS = [
  { label: 'Default', type: 'default' as const },
  { label: 'Danger', type: 'danger' as const },
  { label: 'Disabled', type: 'disabled' as const },
];

function ButtonVariantList() {
  const renderButtonColumn = (
    variant: { label: string; type: 'default' | 'hot' | 'danger' | 'disabled' },
    sizeObj: { label: string; size: 'default' | 'narrow' }
  ) => (
    <div key={variant.type + sizeObj.size} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', minWidth: 180, flex: '1 1 220px', boxSizing: 'border-box' }}>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{variant.label} {sizeObj.label}</div>
      {BUTTON_STATES.map((state) => (
        <div key={state.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: '100%' }}>
          <Button
            label={`${variant.label} ${sizeObj.label} ${state.label}`}
            type={variant.type}
            size={sizeObj.size}
            {...state.props}
          />
          <span style={{ fontSize: 12, color: '#888' }}>{state.label}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, width: '100%', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%', justifyContent: 'flex-start' }}>
        {BUTTON_VARIANTS.map(variant => renderButtonColumn(variant, BUTTON_SIZES[0]))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%', justifyContent: 'flex-start' }}>
        {BUTTON_VARIANTS.map(variant => renderButtonColumn(variant, BUTTON_SIZES[1]))}
      </div>
    </div>
  );
}

function ActionButtonVariantList() {
  const renderActionButtonColumn = (
    variant: { label: string; type: 'default' | 'danger' | 'disabled' },
    sizeObj: { label: string; size: 'default' | 'narrow' }
  ) => (
    <div key={variant.type + sizeObj.size} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start', minWidth: 180, flex: '1 1 220px', boxSizing: 'border-box' }}>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{variant.label} {sizeObj.label}</div>
      {BUTTON_STATES.map((state) => (
        <div key={state.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4, width: '100%' }}>
          <ActionButton
            label={`${variant.label} ${sizeObj.label} ${state.label}`}
            type={variant.type}
            size={sizeObj.size}
            {...state.props}
          />
          <span style={{ fontSize: 12, color: '#888' }}>{state.label}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, width: '100%', justifyContent: 'flex-start' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%', justifyContent: 'flex-start' }}>
        {ACTION_BUTTON_VARIANTS.map(variant => renderActionButtonColumn(variant, BUTTON_SIZES[0]))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%', justifyContent: 'flex-start' }}>
        {ACTION_BUTTON_VARIANTS.map(variant => renderActionButtonColumn(variant, BUTTON_SIZES[1]))}
      </div>
    </div>
  );
}

function ButtonGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%', maxWidth: 1400, margin: '0 auto', boxSizing: 'border-box' }}>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h2>Button Group (Default Size)</h2>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ButtonGroup
            size="default"
            buttons={[
              { label: 'Label' },
              { label: 'Label' },
              { label: 'Label' },
              { label: 'Label' },
            ]}
          />
        </div>
      </div>
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <h2>Button Group (Narrow Size)</h2>
        <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <ButtonGroup
            size="narrow"
            buttons={[
              { label: 'Label' },
              { label: 'Label' },
              { label: 'Label' },
              { label: 'Label' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function AllRequestsTablePage() {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column', }}>
        <Breadcrumb items={[{ label: 'Dashboard', to: '/' }, { label: 'All Requests' }]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left' }}>All Requests</h1>
        <DashboardPage showOnlyTable />
      </main>
    </div>
  );
}

function DashboardPageWithNav() {
  // Only render the dashboard page, not NavBar (NavBar is already inside DashboardPage)
  return <DashboardPage />;
}


function TrackInProgressPage() {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column',}}>
        <Breadcrumb items={[{ label: 'Dashboard', to: '/' }, { label: 'Track In Progress' }]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left' }}>Track In Progress</h1>
        <Card>
          <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal  }}>
            Here you can track the status and details of your in-progress requests. (Demo content)
          </div>
        </Card>
      </main>
    </div>
  );
}

function ReportCompletePage() {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column', }}>
        <Breadcrumb items={[{ label: 'Dashboard', to: '/' }, { label: 'Report Complete' }]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left' }}>Report Complete</h1>
        <Card>
          <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
            Here you can view and report on completed requests. (Demo content)
          </div>
        </Card>
      </main>
    </div>
  );
}

function ResolveWarningsPage() {
  return (
    <div style={{ minHeight: '100vh', width: '100vw', background: COLORS.almostWhite, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <NavBar />
      <main style={{ width: '100%', maxWidth: 1440, minHeight: 1024, margin: '0 auto', padding: `${SPACING.xxl}px ${SPACING.xl}px`, boxSizing: 'border-box', flex: 1, display: 'flex', flexDirection: 'column',}}>
        <Breadcrumb items={[{ label: 'Dashboard', to: '/' }, { label: 'Resolve Warnings' }]} />
        <h1 style={{ ...TYPOGRAPHY.titleDefault, margin: '32px 0 16px 0', color: COLORS.navyBlue, textAlign: 'left' }}>Resolve Warnings</h1>
        <Card>
          <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
            Here you can resolve outstanding warnings. (Demo content)
          </div>
        </Card>
      </main>
    </div>
  );
}

function App() {
  const [showWarning, setShowWarning] = useState(true);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/requests" element={<AllRequestsTablePage />} />
        <Route path="/track-in-progress" element={<TrackInProgressPage />} />
        <Route path="/report-complete" element={<ReportCompletePage />} />
        <Route path="/resolve-warnings" element={<ResolveWarningsPage />} />
        <Route path="/design-library" element={
          <div style={{ width: '100%', maxWidth: 1400, margin: '0 auto', boxSizing: 'border-box' }}>
            <NavBar />
            {/* --- Dashboard Section --- */}
            <section style={{ width: '100%' }}>
              <DashboardPage />
            </section>
            {/* --- Design Library Demo Section --- */}
            <section style={{ width: '100vw' }}>
              <div style={{ width: '100vw', maxWidth: 1400, margin: '0 auto', boxSizing: 'border-box', padding: '0 24px' }}>
                <h1>Design Library</h1>
                <h2>All Button Variants & States</h2>
                <p>This section demonstrates every button variant (Default, Hot, Danger, Disabled), each in both Default and Narrow sizes, and in all states (Default, Hover, Active, Disabled).</p>
                <div style={{ width: '100%' }}>
                  <ButtonVariantList />
                </div>
                <h2 style={{ marginTop: 48 }}>All ActionButton Variants & States</h2>
                <p>This section demonstrates every ActionButton variant (Default, Danger, Disabled), each in both Default and Narrow sizes, and in all states (Default, Hover, Active, Disabled).</p>
                <div style={{ width: '100%' }}>
                  <ActionButtonVariantList />
                </div>
                <h2 style={{ marginTop: 48 }}>Button Group Demo</h2>
                <div style={{ width: '100%', minWidth: 0 }}>
                  <ButtonGroupDemo />
                </div>
                {/* Card Component Demo Section */}
                <h2 style={{ marginTop: 48 }}>Card Component Demo</h2>
                <p>Flexible Card component with support for title, content, media, and footer. Uses design system variables for all styling.</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 24, width: '100%', justifyContent: 'flex-start' }}>
                  <Card 
                    title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.navyBlue }}>Card Title</span>}
                    footer={<span style={{ ...TYPOGRAPHY.bodySmallSM, color: COLORS.silver }}>Footer content</span>}
                    style={{ maxWidth: 320, flex: '1 1 280px', minWidth: 220 }}
                  >
                    <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                      This is a simple card with a title, content, and a footer.
                    </div>
                  </Card>
                  <Card
                    title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.navyBlue }}>Card with Media</span>}
                    media={<img src="https://placekitten.com/320/120" alt="Kitten" style={{ width: '100%', borderRadius: 8 }} />}
                    footer={<Button label="Action" type="hot" size="default" />}
                    style={{ maxWidth: 320, flex: '1 1 280px', minWidth: 220 }}
                  >
                    <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                      Card with an image/media at the top, a title, and a footer action button.
                    </div>
                  </Card>
                  <Card style={{ maxWidth: 240, flex: '1 1 180px', minWidth: 160 }}>
                    <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                      Minimal card with only content.
                    </div>
                  </Card>
                  <Card
                    title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.sangriaRed }}>Danger Card</span>}
                    footer={<Button label="Warning" type="danger" size="narrow" />}
                    style={{ border: `1.5px solid ${COLORS.sangriaRed}`, maxWidth: 320, flex: '1 1 280px', minWidth: 220 }}
                  >
                    <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.sangriaRed }}>
                      This card uses custom color and a danger button for a warning/danger state.
                    </div>
                  </Card>
                </div>
                {/* Card Layout Grid Demo Section */}
                <h2 style={{ marginTop: 48 }}>Card Layout Grid Demo</h2>
                <p>Responsive grid layout with 8 cards, using the LayoutGrid and Card components.</p>
                <div style={{ width: '100%' }}>
                  <LayoutGrid>
                    {[...Array(8)].map((_, i) => (
                      <Card
                        key={i}
                        title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.navyBlue }}>Card {i + 1}</span>}
                        footer={<Button label="Action" type={i % 2 === 0 ? 'hot' : 'default'} size="default" />}
                        style={{ minHeight: 180, margin: 0, flex: '1 1 220px', minWidth: 180 }}
                      >
                        <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                          This is card number {i + 1}. It is part of a responsive grid layout.
                        </div>
                      </Card>
                    ))}
                  </LayoutGrid>
                </div>
                {/* Responsive Button Row Demo Section */}
                <h2 style={{ marginTop: 48 }}>Responsive Button Row Demo</h2>
                <p>A row of 4 buttons that wraps responsively on smaller screens.</p>
                <div style={{ width: '100%' }}>
                  <ButtonRow
                    buttons={[
                      <Button key="b1" label="Button 1" type="default" size="default" />, 
                      <Button key="b2" label="Button 2" type="hot" size="default" />, 
                      <Button key="b3" label="Button 3" type="danger" size="default" />, 
                      <Button key="b4" label="Button 4" type="default" size="default" />
                    ]}
                  />
                </div>
                {/* Warning Message Modal Preview Section */}
                <div style={{ flex: 1, minWidth: 280, marginTop: 48, width: '100%' }}>
                  <h2>Warning Message Modal Preview</h2>
                  <div style={{ position: 'relative', minHeight: 400 }}>
                    {showWarning && (
                      <WarningMessageModal
                        onCancel={() => setShowWarning(false)}
                        onContinue={() => setShowWarning(false)}
                      />
                    )}
                    {!showWarning && (
                      <div style={{ marginTop: 32 }}>
                        <button
                          style={{
                            padding: '8px 16px',
                            borderRadius: 4,
                            border: '2px solid #126080',
                            background: '#126080',
                            color: '#fff',
                            fontWeight: 500,
                            fontSize: 16,
                            cursor: 'pointer',
                          }}
                          onClick={() => setShowWarning(true)}
                        >
                          Show Warning Modal
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {/* ShowcaseGridPage Demo Section */}
                <h2 style={{ marginTop: 48 }}>ShowcaseGridPage Demo</h2>
                <div style={{ width: '100%' }}>
                  <ShowcaseGridPage />
                </div>
              </div>
            </section>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;