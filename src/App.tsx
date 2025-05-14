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
    <div key={variant.type + sizeObj.size} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{variant.label} {sizeObj.label}</div>
      {BUTTON_STATES.map((state) => (
        <div key={state.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
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
    <div style={{ display: 'flex', flexDirection: 'row', gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
        {BUTTON_VARIANTS.map(variant => renderButtonColumn(variant, BUTTON_SIZES[0]))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
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
    <div key={variant.type + sizeObj.size} style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <div style={{ fontWeight: 500, marginBottom: 4 }}>{variant.label} {sizeObj.label}</div>
      {BUTTON_STATES.map((state) => (
        <div key={state.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
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
    <div style={{ display: 'flex', flexDirection: 'row', gap: 48 }}>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
        {ACTION_BUTTON_VARIANTS.map(variant => renderActionButtonColumn(variant, BUTTON_SIZES[0]))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: 32 }}>
        {ACTION_BUTTON_VARIANTS.map(variant => renderActionButtonColumn(variant, BUTTON_SIZES[1]))}
      </div>
    </div>
  );
}

function ButtonGroupDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h2>Button Group (Default Size)</h2>
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
      <div>
        <h2>Button Group (Narrow Size)</h2>
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
  );
}

function App() {
  const [count, setCount] = useState(0)
  const [showWarning, setShowWarning] = useState(true);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '2rem', alignItems: 'flex-start', padding: '2rem' }}>
        <div style={{ flex: 2 }}>
          <h1>Design Library</h1>
          <h2>All Button Variants & States</h2>
          <p>This section demonstrates every button variant (Default, Hot, Danger, Disabled), each in both Default and Narrow sizes, and in all states (Default, Hover, Active, Disabled).</p>
          <ButtonVariantList />
          <h2 style={{ marginTop: 48 }}>All ActionButton Variants & States</h2>
          <p>This section demonstrates every ActionButton variant (Default, Danger, Disabled), each in both Default and Narrow sizes, and in all states (Default, Hover, Active, Disabled).</p>
          <ActionButtonVariantList />
          <h2 style={{ marginTop: 48 }}>Button Group Demo</h2>
          <ButtonGroupDemo />
          {/* Card Component Demo Section */}
          <h2 style={{ marginTop: 48 }}>Card Component Demo</h2>
          <p>Flexible Card component with support for title, content, media, and footer. Uses design system variables for all styling.</p>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 32, flexWrap: 'wrap', marginTop: 24 }}>
            <Card 
              title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.navyBlue }}>Card Title</span>}
              footer={<span style={{ ...TYPOGRAPHY.bodySmallSM, color: COLORS.silver }}>Footer content</span>}
              style={{ maxWidth: 320 }}
            >
              <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                This is a simple card with a title, content, and a footer.
              </div>
            </Card>
            <Card
              title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.navyBlue }}>Card with Media</span>}
              media={<img src="https://placekitten.com/320/120" alt="Kitten" style={{ width: '100%', borderRadius: 8 }} />}
              footer={<Button label="Action" type="hot" size="default" />}
              style={{ maxWidth: 320 }}
            >
              <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                Card with an image/media at the top, a title, and a footer action button.
              </div>
            </Card>
            <Card style={{ maxWidth: 240 }}>
              <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                Minimal card with only content.
              </div>
            </Card>
            <Card
              title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.sangriaRed }}>Danger Card</span>}
              footer={<Button label="Warning" type="danger" size="narrow" />}
              style={{ border: `1.5px solid ${COLORS.sangriaRed}`, maxWidth: 320 }}
            >
              <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.sangriaRed }}>
                This card uses custom color and a danger button for a warning/danger state.
              </div>
            </Card>
          </div>
          {/* Card Layout Grid Demo Section */}
          <h2 style={{ marginTop: 48 }}>Card Layout Grid Demo</h2>
          <p>Responsive grid layout with 8 cards, using the LayoutGrid and Card components.</p>
          <LayoutGrid>
            {[...Array(8)].map((_, i) => (
              <Card
                key={i}
                title={<span style={{ ...TYPOGRAPHY.titleSmallSM, color: COLORS.navyBlue }}>Card {i + 1}</span>}
                footer={<Button label="Action" type={i % 2 === 0 ? 'hot' : 'default'} size="default" />}
                style={{ minHeight: 180, margin: 0 }} // margin:0 to let grid gap control spacing
              >
                <div style={{ ...TYPOGRAPHY.bodyRegular, color: COLORS.gunmetal }}>
                  This is card number {i + 1}. It is part of a responsive grid layout.
                </div>
              </Card>
            ))}
          </LayoutGrid>
          {/* Responsive Button Row Demo Section */}
          <h2 style={{ marginTop: 48 }}>Responsive Button Row Demo</h2>
          <p>A row of 4 buttons that wraps responsively on smaller screens.</p>
          <ButtonRow
            buttons={[
              <Button key="b1" label="Button 1" type="default" size="default" />, 
              <Button key="b2" label="Button 2" type="hot" size="default" />, 
              <Button key="b3" label="Button 3" type="danger" size="default" />, 
              <Button key="b4" label="Button 4" type="default" size="default" />
            ]}
          />
        </div>
        <div style={{ flex: 1, minWidth: 480 }}>
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
      </div>
    </>
  );
}

export default App;