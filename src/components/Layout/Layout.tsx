import React from 'react';
import { MotionConfig } from 'framer-motion';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const reducedMotion = useReducedMotionPreference();
  return (
    <MotionConfig reducedMotion={reducedMotion ? 'always' : 'never'}>
      <div className="site-shell">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="page-grid" aria-hidden="true" />
        {children}
      </div>
    </MotionConfig>
  );
};

export default Layout;
