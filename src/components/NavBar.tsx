import React, { useState, useEffect } from 'react';
import { IconBell, IconHelp, IconSettings, IconGridDots, IconMenu2 } from '@tabler/icons-react';
import { COLORS } from './colors';
import { TYPOGRAPHY } from './typography';
import { SPACING } from './spacing';

const userImg = 'https://randomuser.me/api/portraits/men/32.jpg'; // Replace with your user image if needed

const NavBar: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    // Set initial value
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      style={{
        width: '100vw',
        background: COLORS.white,
        borderBottom: `1px solid ${COLORS.lightSilver}`,
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
        padding: '0 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1400,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        {/* Left: Menu Icon & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              marginRight: 8,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Open menu"
          >
            <IconGridDots size={28} color={COLORS.gunmetal} />
          </button>
          <img
            src="/vite.svg"
            alt="OCIF Logo"
            style={{ height: isMobile ? 22 : 32, marginRight: 8 }}
          />
          <span
            style={{
              ...TYPOGRAPHY.titleDefault,
              color: '#9B7B3E',
              fontWeight: 700,
              fontSize: isMobile ? 20 : 32,
              letterSpacing: 2,
              fontFamily: 'serif',
              marginRight: 16,
            }}
          >
            OCIF
          </span>
          <span
            style={{
              ...TYPOGRAPHY.bodyBigL,
              color: COLORS.gunmetal,
              fontWeight: 400,
              fontSize: isMobile ? 14 : 22,
              marginLeft: 8,
            }}
          >
            Request Management
          </span>
        </div>
        {/* Right: Hamburger for mobile, icons for desktop */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {isMobile ? (
            <button
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                marginLeft: 8,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label="Open mobile menu"
              // onClick={() => setMobileMenuOpen(m => !m)} // Removed toggle logic
            >
              <IconMenu2 size={32} color={COLORS.gunmetal} />
            </button>
          ) : (
            <>
              <IconBell size={26} color={COLORS.blueGray} style={{ cursor: 'pointer' }} />
              <IconHelp size={26} color={COLORS.blueGray} style={{ cursor: 'pointer' }} />
              <IconSettings size={26} color={COLORS.blueGray} style={{ cursor: 'pointer' }} />
              <IconGridDots size={26} color={COLORS.blueGray} style={{ cursor: 'pointer' }} />
              <img
                src={userImg}
                alt="User"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: `2px solid ${COLORS.lightSilver}`,
                  marginLeft: 8,
                }}
              />
            </>
          )}
        </div>
      </div>
      {/* Optionally, render a mobile menu dropdown here if mobileMenuOpen is true */}
    </nav>
  );
};

export default NavBar;
