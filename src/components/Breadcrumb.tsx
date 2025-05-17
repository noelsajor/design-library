import React from 'react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="breadcrumb" style={{ margin: '24px 0 16px 0', width: '100%' }}>
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
                }}
                onMouseOver={e => (e.currentTarget.style.background = COLORS.paleBlue)}
                onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
              >
                {item.label}
              </a>
            ) : (
              <span style={{ ...TYPOGRAPHY.bodySmallSM, color: COLORS.gunmetal, fontWeight: 600, padding: '0 4px' }}>{item.label}</span>
            )}
            {idx < items.length - 1 && (
              <span style={{ color: COLORS.silver, margin: '0 4px' }}>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
