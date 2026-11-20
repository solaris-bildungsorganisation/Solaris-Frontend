import React from 'react';

/**
 * Conditional verification code notice banner displayed after successful form submission.
 */
function VerificationNotice({ visible }) {
  if (!visible) {
    return null;
  }

  return (
    <div className="verification-notice" role="status" aria-live="polite">
      You may asked for the verification code
    </div>
  );
}

export default VerificationNotice;
