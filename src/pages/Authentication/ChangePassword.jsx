import React, { useState } from 'react';
import {
  MemoryRouter,
  useInRouterContext,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import PasswordField from '../../components/PasswordField';
import PasswordStrength, {
  getPasswordChecks,
} from '../../components/PasswordStrength';
import PrimaryButton from '../../components/PrimaryButton';
import PATHS from '../../routes/paths';

import shieldKeyIllustration from '../../assets/image (1).svg';

import './PasswordRecovery.css';

const ENABLE_VALIDATION = false;

/**
 * Solaris Education - Step 4: "Change Password" Page (/change-password)
 * Navigates to /password-changed (PATHS.PASSWORD_CHANGED) on submit.
 */
function ChangePasswordContent({ onPasswordChanged }) {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    const passwordChecks = getPasswordChecks(newPassword);

    if (!newPassword) {
      nextErrors.newPassword = 'New password is required.';
    } else if (!passwordChecks.minLength) {
      nextErrors.newPassword = 'Password must be at least 8 characters.';
    } else if (!passwordChecks.hasNumber || !passwordChecks.hasSymbol) {
      nextErrors.newPassword =
        'Password must include at least 8 characters, a number, and a symbol.';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your new password.';
    } else if (confirmPassword !== newPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (ENABLE_VALIDATION) {
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    }

    setErrors({});
    setIsSubmitting(false);

    if (onPasswordChanged) {
      onPasswordChanged();
    }

    // TODO: call change-password API, then navigate only on success
    navigate(PATHS.PASSWORD_CHANGED);
  };

  return (
    <AuthLayout contentClassName="recovery-card">
      <div className="auth-step-content">
        {/* 1. Shield-with-key Illustration (~135px wide, centered) */}
        <div className="auth-illustration-wrapper">
          <img
            src={shieldKeyIllustration}
            alt="Change password security shield illustration"
            className="auth-illustration"
          />
        </div>

        {/* 2. Heading */}
        <h2 className="auth-step-heading">Change Password</h2>

        {/* 3. Description */}
        <p className="auth-step-description">
          Please enter your new password.
        </p>

        {/* 4–6. Change Password Form */}
        <form
          className="recovery-form recovery-form--change"
          onSubmit={handleSubmit}
          noValidate
        >
          <PasswordField
            id="newPassword"
            name="newPassword"
            label="New Password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              clearFieldError('newPassword');
            }}
            placeholder="Enter your new password"
            autoComplete="new-password"
            error={ENABLE_VALIDATION ? errors.newPassword : undefined}
            disabled={isSubmitting}
            isVisible={showNewPassword}
            onToggleVisibility={() => setShowNewPassword((prev) => !prev)}
          />

          <PasswordStrength password={newPassword} />

          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              clearFieldError('confirmPassword');
            }}
            placeholder="confirm your new password"
            autoComplete="new-password"
            error={ENABLE_VALIDATION ? errors.confirmPassword : undefined}
            disabled={isSubmitting}
            isVisible={showConfirmPassword}
            onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
          />

          <PrimaryButton
            type="submit"
            className="recovery-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Changing Password...' : 'Change Password'}
          </PrimaryButton>
        </form>
      </div>
    </AuthLayout>
  );
}

function ChangePassword(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <ChangePasswordContent {...props} />
  ) : (
    <MemoryRouter>
      <ChangePasswordContent {...props} />
    </MemoryRouter>
  );
}

export default ChangePassword;
