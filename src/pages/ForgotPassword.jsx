import React, { useContext, useState } from 'react';
import {
  Link,
  MemoryRouter,
  useInRouterContext,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import { AuthFlowContext } from './VerifyEmail';
import PATHS from '../routes/paths';

import shieldKeyIllustration from '../assets/image (1).svg';
import emailIcon from '../assets/mail (1).svg';

import './PasswordRecovery.css';

const ENABLE_VALIDATION = false;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Solaris Education - "Forgot Password?" Page (/forgot-password)
 * Navigates to /verify-email with email in router state on "Continue".
 */
function ForgotPasswordContent({ onContinue }) {
  const navigate = useNavigate();
  const authContext = useContext(AuthFlowContext);

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ENABLE_VALIDATION) {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const trimmedEmail = email.trim();

      // TODO: call forgot-password API
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (authContext?.setEmail && trimmedEmail) {
        authContext.setEmail(trimmedEmail);
      }

      if (onContinue) {
        onContinue(trimmedEmail);
      }

      navigate(PATHS.VERIFY_EMAIL, {
        state: { email: trimmedEmail || undefined },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout contentClassName="recovery-card">
      <div className="auth-step-content">
        {/* 1. Shield-with-key Illustration (~135px wide, centered) */}
        <div className="auth-illustration-wrapper">
          <img
            src={shieldKeyIllustration}
            alt="Password recovery security shield illustration"
            className="auth-illustration"
          />
        </div>

        {/* 2. Heading */}
        <h2 className="auth-step-heading">Forgot Password?</h2>

        {/* 3. Description */}
        <p className="auth-step-description">
          Please enter your email to reset your password
        </p>

        {/* 4–6. Forgot Password Form */}
        <form
          className="recovery-form recovery-form--forgot"
          onSubmit={handleSubmit}
          noValidate
        >
          <InputField
            id="email"
            name="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearFieldError('email');
            }}
            placeholder="Enter your email"
            autoComplete="email"
            icon={emailIcon}
            error={ENABLE_VALIDATION ? errors.email : undefined}
            disabled={isSubmitting}
          />

          {/* 5. Remember your password? Log in */}
          <div className="remember-password-row">
            <span className="remember-password-text">
              Remember your password?
            </span>
            <Link to={PATHS.LOGIN} className="remember-login-link">
              Log in
            </Link>
          </div>

          {/* 6. Primary Gradient Button */}
          <PrimaryButton
            type="submit"
            className="recovery-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Continuing...' : 'Continue'}
          </PrimaryButton>
        </form>
      </div>
    </AuthLayout>
  );
}

function ForgotPassword(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <ForgotPasswordContent {...props} />
  ) : (
    <MemoryRouter>
      <ForgotPasswordContent {...props} />
    </MemoryRouter>
  );
}

export default ForgotPassword;
