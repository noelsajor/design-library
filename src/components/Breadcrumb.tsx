import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

export interface BreadcrumbItem {
  label: string;
  to?: string;
  icon?: React.ReactNode;
}

const Breadcrumb: React.FC<{
  items: Array<{ label: string; to?: string; icon?: React.ReactNode }>;
  separator?: React.ReactNode;
  ariaLabel?: string;
}> = ({ items, separator = '/', ariaLabel = 'breadcrumb' }) => {
  return (
    <nav aria-label={ariaLabel} style={{ margin: '24px 0 16px 0', width: '100%' }}>
      <ol style={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', padding: 0, margin: 0 }}>
        {items.map((item, idx) => (
          <li key={item.label} style={{ display: 'flex', alignItems: 'center' }}>
            {item.to ? (
              <a
                href={item.to}
                style={{
                  ...TYPOGRAPHY.bodySmallSM,
                  color: COLORS.navyBlue,
                  textDecoration: 'none',
                  fontWeight: 500,
                  padding: '0 4px',
                  borderRadius: 4,
                  transition: 'background 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center', // Center align icon and label
                  gap: 4, // Add gap for icon and label
                }}
                onMouseOver={e => (e.currentTarget.style.background = COLORS.lightSilver)}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                tabIndex={0}
                aria-label={item.label}
              >
                {item.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.label}</span>
              </a>
            ) : (
              <span style={{ ...TYPOGRAPHY.bodySmallSM, color: COLORS.gunmetal, fontWeight: 600, padding: '0 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                {item.icon && <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.label}</span>
              </span>
            )}
            {idx < items.length - 1 && (
              <span style={{ color: COLORS.silver, margin: '0 4px' }}>{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
