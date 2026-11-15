import React, { useContext, useState } from 'react';
import {
  Link,
  MemoryRouter,
  useInRouterContext,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import InputField from '../../components/InputField';
import PasswordField from '../../components/PasswordField';
import PasswordStrengthMeter, {
  getPasswordChecks,
} from '../../components/PasswordStrengthMeter';
import PrimaryButton from '../../components/PrimaryButton';
import VerificationNotice from '../../components/VerificationNotice';
import { AuthFlowContext } from './VerifyEmail';
import PATHS from '../../routes/paths';

import userIcon from '../../assets/mail.svg';
import emailIcon from '../../assets/mail (1).svg';

import './CreateAccount.css';

const ENABLE_VALIDATION = false;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Solaris Education - Step 2: "Create Your Account" Page (/signup)
 * Uses the shared AuthLayout split-screen wrapper.
 */
function CreateAccountContent({ onAccountCreated }) {
  const navigate = useNavigate();
  const authContext = useContext(AuthFlowContext);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVerificationNotice, setShowVerificationNotice] = useState(false);

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

    if (!fullName.trim()) {
      nextErrors.fullName = 'Full name is required.';
    }

    if (!email.trim()) {
      nextErrors.email = 'Email address is required.';
    } else if (!EMAIL_REGEX.test(email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const passwordChecks = getPasswordChecks(password);
    if (!password) {
      nextErrors.password = 'Password is required.';
    } else if (!passwordChecks.minLength) {
      nextErrors.password = 'Password must be at least 8 characters.';
    } else if (!passwordChecks.hasNumber || !passwordChecks.hasSymbol) {
      nextErrors.password =
        'Password must include at least 8 characters, a number, and a symbol.';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Please re-enter your password.';
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreed) {
      nextErrors.agreed = 'You must agree to the Terms of Service and Privacy Policy.';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowVerificationNotice(false);

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

      // TODO: call API to register the user account
      await new Promise((resolve) => setTimeout(resolve, 400));
      setShowVerificationNotice(true);

      if (authContext?.setEmail && trimmedEmail) {
        authContext.setEmail(trimmedEmail);
      }

      if (onAccountCreated) {
        onAccountCreated(trimmedEmail);
      } else {
        navigate(PATHS.VERIFY_EMAIL, {
          state: { email: trimmedEmail || undefined },
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      {/* Heading & Subtitle */}
      <header className="form-header">
        <h2 className="form-title">Create Your Account</h2>
        <p className="form-subtitle">
          Create your account and take the first step toward new opportunities.
        </p>
      </header>

      {/* Registration Form */}
      <form
        className="create-account-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <InputField
          id="fullName"
          name="fullName"
          label="Full Name"
          type="text"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            clearFieldError('fullName');
          }}
          placeholder="Enter your full name"
          autoComplete="name"
          icon={userIcon}
          error={ENABLE_VALIDATION ? errors.fullName : undefined}
          disabled={isSubmitting}
        />

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

        <PasswordField
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError('password');
          }}
          placeholder="Enter your password"
          autoComplete="new-password"
          error={ENABLE_VALIDATION ? errors.password : undefined}
          disabled={isSubmitting}
          isVisible={showPassword}
          onToggleVisibility={() => setShowPassword((prev) => !prev)}
        />

        <PasswordStrengthMeter password={password} />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            clearFieldError('confirmPassword');
          }}
          placeholder="Re-enter your password"
          autoComplete="new-password"
          error={ENABLE_VALIDATION ? errors.confirmPassword : undefined}
          disabled={isSubmitting}
          isVisible={showConfirmPassword}
          onToggleVisibility={() => setShowConfirmPassword((prev) => !prev)}
        />

        {/* Terms & Privacy Checkbox Row */}
        <div className="terms-field">
          <label htmlFor="agreed" className="terms-label">
            <input
              id="agreed"
              name="agreed"
              type="checkbox"
              checked={agreed}
              onChange={(e) => {
                setAgreed(e.target.checked);
                clearFieldError('agreed');
              }}
              disabled={isSubmitting}
              aria-invalid={ENABLE_VALIDATION && Boolean(errors.agreed)}
              aria-describedby={
                ENABLE_VALIDATION && errors.agreed ? 'agreed-error' : undefined
              }
              className={`terms-checkbox ${
                ENABLE_VALIDATION && errors.agreed ? 'terms-checkbox--error' : ''
              }`}
            />
            <span className="terms-text">
              I agree to the{' '}
              <Link
                to="#terms"
                className="terms-link"
                onClick={(e) => e.preventDefault()}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="#privacy"
                className="terms-link"
                onClick={(e) => e.preventDefault()}
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {ENABLE_VALIDATION && errors.agreed && (
            <p id="agreed-error" className="field-error" role="alert">
              {errors.agreed}
            </p>
          )}
        </div>

        {/* Primary Submit Button */}
        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </PrimaryButton>

        {/* Conditional Verification Code Notice */}
        <VerificationNotice visible={showVerificationNotice} />

        {/* Login Prompt */}
        <p className="login-prompt">
          Already have an account?{' '}
          <Link to={PATHS.LOGIN} className="login-link">
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function CreateAccount(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <CreateAccountContent {...props} />
  ) : (
    <MemoryRouter>
      <CreateAccountContent {...props} />
    </MemoryRouter>
  );
}

export default CreateAccount;
