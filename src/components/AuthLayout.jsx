import React from 'react';
import {
  Link,
  MemoryRouter,
  useInRouterContext,
} from 'react-router-dom';
import LanguageSelect from './LanguageSelect';
import PATHS from '../routes/paths';

import backgroundIllustration from '../assets/Background Image.svg';
import solarisLogo from '../assets/Frame 33.svg';
import learningIcon from '../assets/Frame 1063.svg';
import developmentIcon from '../assets/Frame 1064.svg';
import empowermentIcon from '../assets/Frame 1059.svg';

import './AuthLayout.css';

const HERO_STEPS = [
  {
    id: 'learning',
    label: 'Learning',
    icon: learningIcon,
    cropClass: 'hero-step-tile-img--learning',
  },
  {
    id: 'development',
    label: 'Development',
    icon: developmentIcon,
    cropClass: 'hero-step-tile-img--development',
  },
  {
    id: 'empowerment',
    label: 'Empowerment',
    icon: empowermentIcon,
    cropClass: 'hero-step-tile-img--empowerment',
  },
];

/**
 * Shared split-screen authentication layout used across all Solaris auth pages
 * (Login, CreateAccount, VerifyEmail, ForgotPassword, ChangePassword).
 */
function AuthLayoutContent({ children, contentClassName = '' }) {
  return (
    <div className="auth-layout-page">
      {/* Left Hero Panel */}
      <aside className="hero-panel" aria-label="Solaris platform overview">
        <img
          src={backgroundIllustration}
          alt=""
          className="hero-bg-image"
          aria-hidden="true"
        />
        <div className="hero-bg-overlay" aria-hidden="true" />

        <div className="hero-content">
          {/* Top Brand & Heading */}
          <div className="hero-top">
            <div className="hero-brand-row">
              <span className="hero-brand-wordmark">Solaris</span>
              <span className="hero-brand-divider" aria-hidden="true" />
              <span className="hero-brand-tagline">
                A Learning, Skills &amp;
                <br />
                Empowerment Platform
              </span>
            </div>

            <h1 className="hero-heading">
              Unlock Your Potential.
              <br />
              Shape Your Future.
            </h1>

            <p className="hero-subtitle">
              Learn, develop your skills, and unlock opportunities for a brighter future.
            </p>
          </div>

          {/* Bottom Steps & Badge */}
          <div className="hero-bottom">
            <div className="hero-steps" role="list" aria-label="Platform pillars">
              {HERO_STEPS.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div className="hero-step-item" role="listitem">
                    <div className="hero-step-tile-box" aria-hidden="true">
                      <img
                        src={step.icon}
                        alt=""
                        className={`hero-step-tile-img ${step.cropClass}`}
                      />
                    </div>
                    <span className="hero-step-label">{step.label}</span>
                  </div>

                  {index < HERO_STEPS.length - 1 && (
                    <span className="hero-step-arrow" aria-hidden="true">
                      <svg
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 6H16M16 6L11.5 1.5M16 6L11.5 10.5"
                          stroke="#C5A34A"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="hero-badge-row">
              <span className="hero-pill-badge">Learn. Practice. Progress.</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel */}
      <main className="form-panel">
        {/* Top Bar with Language Selector */}
        <div className="form-panel-topbar">
          <LanguageSelect />
        </div>

        {/* Main Content Area with Solaris Education Logo at Top-Left */}
        <div className="form-panel-body">
          <div className={`form-card ${contentClassName}`.trim()}>
            <div className="form-logo-wrapper">
              <Link
                to={PATHS.LOGIN}
                className="form-logo-link"
                aria-label="Solaris Education - Go to login"
              >
                <img
                  src={solarisLogo}
                  alt="Solaris Education"
                  className="form-logo"
                />
              </Link>
            </div>

            {children}
          </div>
        </div>

        {/* Footer Row */}
        <footer className="form-panel-footer">
          <span className="footer-copyright">
            &copy; 2026 Solaris. All rights reserved.
          </span>
          <nav className="footer-links" aria-label="Legal links">
            <Link
              to="#privacy-policy"
              className="footer-link"
              onClick={(e) => e.preventDefault()}
            >
              Privacy policy
            </Link>
            <Link
              to="#terms-conditions"
              className="footer-link"
              onClick={(e) => e.preventDefault()}
            >
              Terms &amp; conditions
            </Link>
            <Link
              to="#cookies"
              className="footer-link"
              onClick={(e) => e.preventDefault()}
            >
              Cookies
            </Link>
          </nav>
        </footer>
      </main>
    </div>
  );
}

function AuthLayout(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <AuthLayoutContent {...props} />
  ) : (
    <MemoryRouter>
      <AuthLayoutContent {...props} />
    </MemoryRouter>
  );
}

export default AuthLayout;
