import React from 'react';

/**
 * Shared full-width primary dark-navy gradient button used across
 * Solaris Education authentication pages (CreateAccount, ForgotPassword,
 * ChangePassword, Login).
 */
function PrimaryButton({
  type = 'submit',
  disabled = false,
  onClick,
  className = '',
  children,
}) {
  return (
    <button
      type={type}
      className={`submit-btn ${className}`.trim()}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
