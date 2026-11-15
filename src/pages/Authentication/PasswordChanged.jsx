import React, { useEffect, useRef } from 'react';
import {
  MemoryRouter,
  useInRouterContext,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import PrimaryButton from '../../components/PrimaryButton';
import PATHS from '../../routes/paths';

import successIllustration from '../../assets/Elements.svg';

import './PasswordRecovery.css';

/**
 * Solaris Education - "Password changed successfully!" Page (/password-changed)
 * Final screen of the password-recovery flow:
 * Forgot Password -> Verify Email -> Change Password -> Password Changed -> Login
 */
function PasswordChangedContent() {
  const navigate = useNavigate();
  const headingRef = useRef(null);

  // Move focus to the heading on mount so screen readers announce the success message
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const handleBackToLogin = () => {
    navigate(PATHS.LOGIN);
  };

  return (
    <AuthLayout contentClassName="password-changed-card">
      <div className="auth-step-content">
        {/* 1. Decorative Success Illustration (~230px wide on desktop, ~180px below 1024px) */}
        <div
          className="password-changed-illustration-wrapper"
          aria-hidden="true"
        >
          <img
            src={successIllustration}
            alt=""
            aria-hidden="true"
            className="password-changed-illustration"
          />
        </div>

        {/* 2. Heading (<h1> focused on mount for screen reader announcement) */}
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="auth-step-heading password-changed-heading"
        >
          Password changed successfully!
        </h1>

        {/* 3. Description (~16px dark, max-width ~440px wrapping on two lines) */}
        <p className="password-changed-description">
          Your password has been updated successfully. You can now return and
          log in
        </p>

        {/* 4. Full-width Primary Gradient Button (~16px below description) */}
        <PrimaryButton
          type="button"
          className="password-changed-btn"
          onClick={handleBackToLogin}
        >
          Back to login
        </PrimaryButton>
      </div>
    </AuthLayout>
  );
}

function PasswordChanged(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <PasswordChangedContent {...props} />
  ) : (
    <MemoryRouter>
      <PasswordChangedContent {...props} />
    </MemoryRouter>
  );
}

export default PasswordChanged;
