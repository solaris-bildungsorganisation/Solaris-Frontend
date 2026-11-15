import React, { useState } from 'react';
import {
  Link,
  MemoryRouter,
  useInRouterContext,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';
import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import PrimaryButton from '../components/PrimaryButton';
import PATHS from '../routes/paths';

import emailIcon from '../assets/mail (1).svg';

import './CreateAccount.css';
import './PasswordRecovery.css';

const ENABLE_VALIDATION = false;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Solaris Education - Step 1: "Log In" Page (/login)
 * Links to /forgot-password ("Forgot password?") and /signup ("Sign up").
 * Submitting "Log In" navigates to / (PATHS.ROOT).
 */
function LoginContent({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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

    if (!password) {
      nextErrors.password = 'Password is required.';
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
      // TODO: call login API
      await new Promise((resolve) => setTimeout(resolve, 300));
      if (onLogin) {
        onLogin(email.trim());
      }
      navigate(PATHS.ROOT);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <header className="form-header">
        <h2 className="form-title">Welcome Back</h2>
        <p className="form-subtitle">
          Log in to your Solaris account to continue learning and growing.
        </p>
      </header>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <InputField
          id="login-email"
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
          id="login-password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            clearFieldError('password');
          }}
          placeholder="Enter your password"
          autoComplete="current-password"
          error={ENABLE_VALIDATION ? errors.password : undefined}
          disabled={isSubmitting}
          isVisible={showPassword}
          onToggleVisibility={() => setShowPassword((prev) => !prev)}
        />

        <div className="login-options-row">
          <Link to={PATHS.FORGOT_PASSWORD} className="forgot-password-link">
            Forgot password?
          </Link>
        </div>

        <PrimaryButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log In'}
        </PrimaryButton>

        <p className="login-prompt">
          Don&apos;t have an account?{' '}
          <Link to={PATHS.SIGNUP} className="login-link">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function Login(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <LoginContent {...props} />
  ) : (
    <MemoryRouter>
      <LoginContent {...props} />
    </MemoryRouter>
  );
}

export default Login;
