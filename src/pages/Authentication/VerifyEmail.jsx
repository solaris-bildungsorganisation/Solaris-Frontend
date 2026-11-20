import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  MemoryRouter,
  useInRouterContext,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import AuthLayout from '../../components/AuthLayout';
import OtpInputGroup from '../../components/OtpInputGroup';
import PATHS from '../../routes/paths';

import verifyEmailIllustration from '../../assets/image.svg';

import './VerifyEmail.css';

// TEMPORARY: remove or set DEV_BYPASS to false before production.
const DEV_BYPASS = true;
const DEV_CODE = "000000";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 60;
const DEFAULT_EMAIL = 'username@gmail.com';

export const AuthFlowContext = createContext({
  email: '',
  setEmail: () => {},
});

/**
 * Solaris Education - Step 3: "Verify Your Email Address" Page (/verify-email)
 * Handles Enter ('default'), Wrong ('error'), and Valid ('valid') OTP states
 * in a single component via local `status` state.
 */
function VerifyEmailContent({
  email: emailProp,
  location: locationProp,
  onVerify,
  onVerified,
  onResend,
}) {
  const routerLocation = useLocation();
  const navigate = useNavigate();
  const contextValue = useContext(AuthFlowContext);

  // Resolve user's email from router location state, props, or context (fallback "username@gmail.com")
  const resolvedEmail =
    routerLocation?.state?.email ||
    emailProp ||
    locationProp?.state?.email ||
    contextValue?.email ||
    DEFAULT_EMAIL;

  const [otpValues, setOtpValues] = useState(() => Array(OTP_LENGTH).fill(''));
  const [status, setStatus] = useState('default'); // 'default' | 'error' | 'valid'
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Countdown timer for "Resend the code" button-link
  useEffect(() => {
    if (resendCooldown <= 0) {
      return undefined;
    }

    const timerId = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timerId);
  }, [resendCooldown]);

  const handleOtpChange = (nextValues) => {
    // Reset status/error once user begins typing a new digit
    if (status !== 'default' && nextValues.some((val) => val !== '')) {
      setStatus('default');
      setError('');
    }
    setOtpValues(nextValues);
  };

  const handleVerify = async (code) => {
    if (isVerifying) {
      return;
    }

    setIsVerifying(true);
    setError('');
    setStatus('default');

    try {
      if (DEV_BYPASS) {
        if (code !== DEV_CODE) {
          throw new Error('Invalid code');
        }
      } else {
        // TODO: call verification API
        if (onVerify) {
          await onVerify(code);
        } else if (code === '000000') {
          throw new Error('Invalid code');
        }
      }

      setStatus('valid');

      // TODO: navigate to the next step after successful email verification
      if (onVerified) {
        onVerified(code);
      } else {
        navigate(PATHS.CHANGE_PASSWORD, { state: { email: resolvedEmail } });
      }
    } catch (err) {
      setStatus('error');
      setError('Invalid code. Please try again.');
      setOtpValues(Array(OTP_LENGTH).fill(''));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendClick = async () => {
    if (resendCooldown > 0 || isVerifying) {
      return;
    }

    setStatus('default');
    setError('');
    setResendCooldown(RESEND_COOLDOWN_SECONDS);

    if (DEV_BYPASS) {
      return;
    } else {
      // TODO: call resend API
      if (onResend) {
        await onResend(resolvedEmail);
      }
    }
  };

  return (
    <AuthLayout contentClassName="verify-email-card">
      <div className="verify-email-content">
        {/* 1. Envelope-and-laptop Illustration */}
        <div className="verify-illustration-wrapper">
          <img
            src={verifyEmailIllustration}
            alt="Email verification illustration"
            className="verify-illustration"
          />
        </div>

        {/* 2. Heading */}
        <h2 className="verify-heading">Verify Your Email Address</h2>

        {/* 3. Description with User's Email */}
        <p className="verify-description">
          Please enter the code we just sent to the email address{' '}
          <span className="verify-email-highlight">{resolvedEmail}</span>
        </p>

        {/* 4. 6-Box OTP Input & Resend Section */}
        <div className="verify-otp-section">
          <OtpInputGroup
            length={OTP_LENGTH}
            value={otpValues}
            onChange={handleOtpChange}
            onComplete={handleVerify}
            status={status}
            disabled={isVerifying}
            errorId="otp-error-message"
          />

          {status === 'error' && error && (
            <p id="otp-error-message" className="verify-error" role="alert">
              {error}
            </p>
          )}

          {/* 5. Resend Prompt Row (left-aligned with OTP boxes) */}
          <div className="verify-resend-row">
            <span className="verify-resend-prompt">
              Didn&apos;t receive the code?
            </span>{' '}
            <button
              type="button"
              className="verify-resend-btn"
              onClick={handleResendClick}
              disabled={resendCooldown > 0 || isVerifying}
            >
              {resendCooldown > 0
                ? `Resend the code in ${resendCooldown}s`
                : 'Resend the code'}
            </button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}

function VerifyEmail(props) {
  const inRouter = useInRouterContext();
  return inRouter ? (
    <VerifyEmailContent {...props} />
  ) : (
    <MemoryRouter>
      <VerifyEmailContent {...props} />
    </MemoryRouter>
  );
}

export default VerifyEmail;
