import React, { useEffect, useRef } from 'react';

/**
 * Reusable 6-digit OTP input component.
 *
 * Features:
 * - Numeric-only entry (inputMode="numeric", maxLength=1)
 * - autoComplete="one-time-code" on the first input
 * - Auto-focuses the first box on mount
 * - Auto-advances to the next box when a digit is typed
 * - Backspace on an empty box moves focus to the previous box and clears it
 * - ArrowLeft / ArrowRight navigate between boxes
 * - Pasting a 6-digit code into any box distributes digits across all boxes
 * - Calls onComplete(code) automatically when all 6 digits are filled
 */
function OtpInput({
  length = 6,
  values,
  onChange,
  onComplete,
  hasError = false,
  disabled = false,
  errorId,
}) {
  const inputRefs = useRef([]);
  const lastCompletedCodeRef = useRef('');

  // Auto-focus the first box on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  // Reset lastCompletedCodeRef when inputs are cleared so user can re-enter
  useEffect(() => {
    const joined = values.join('');
    if (joined.length < length) {
      lastCompletedCodeRef.current = '';
    }
    if (hasError && joined.length === 0 && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [values, length, hasError, disabled]);

  const focusInput = (index) => {
    const clampedIndex = Math.max(0, Math.min(length - 1, index));
    const target = inputRefs.current[clampedIndex];
    if (target) {
      target.focus();
      target.select?.();
    }
  };

  const updateValues = (nextValues, nextFocusIndex) => {
    onChange(nextValues);

    if (typeof nextFocusIndex === 'number') {
      focusInput(nextFocusIndex);
    }

    const isAllFilled =
      nextValues.length === length &&
      nextValues.every((char) => /^[0-9]$/.test(char));

    if (isAllFilled) {
      const code = nextValues.join('');
      if (lastCompletedCodeRef.current !== code) {
        lastCompletedCodeRef.current = code;
        onComplete?.(code);
      }
    }
  };

  const handleChange = (index, e) => {
    const rawValue = e.target.value;
    const digitsOnly = rawValue.replace(/\D/g, '');

    if (!digitsOnly) {
      // Cleared via input event
      const nextValues = [...values];
      nextValues[index] = '';
      updateValues(nextValues);
      return;
    }

    // If multiple digits came through a single change event (e.g. mobile autofill)
    if (digitsOnly.length > 1) {
      const nextValues = [...values];
      const chars = digitsOnly.slice(0, length).split('');
      const startIndex = chars.length === length ? 0 : index;

      chars.forEach((digit, offset) => {
        if (startIndex + offset < length) {
          nextValues[startIndex + offset] = digit;
        }
      });

      const nextFocus = Math.min(startIndex + chars.length, length - 1);
      updateValues(nextValues, nextFocus);
      return;
    }

    // Single digit typed: take the newly typed digit
    const digit = digitsOnly.slice(-1);
    const nextValues = [...values];
    nextValues[index] = digit;

    const nextFocus = index < length - 1 ? index + 1 : index;
    updateValues(nextValues, nextFocus);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const nextValues = [...values];

      if (values[index]) {
        // Clear current box
        nextValues[index] = '';
        updateValues(nextValues, index);
      } else if (index > 0) {
        // Current box is empty: move focus to previous box and clear it
        nextValues[index - 1] = '';
        updateValues(nextValues, index - 1);
      }
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (index > 0) {
        focusInput(index - 1);
      }
      return;
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (index < length - 1) {
        focusInput(index + 1);
      }
      return;
    }

    // If user types a digit while box already contains a digit, replace it and advance
    if (/^[0-9]$/.test(e.key) && values[index]) {
      e.preventDefault();
      const nextValues = [...values];
      nextValues[index] = e.key;
      const nextFocus = index < length - 1 ? index + 1 : index;
      updateValues(nextValues, nextFocus);
      return;
    }

    // Block non-digit printable keys (while allowing Ctrl/Cmd shortcuts like Ctrl+V)
    if (
      e.key.length === 1 &&
      !/^[0-9]$/.test(e.key) &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.altKey
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (index, e) => {
    e.preventDefault();
    const pastedData = e.clipboardData?.getData('text') || '';
    const digits = pastedData.replace(/\D/g, '').slice(0, length);

    if (!digits) {
      return;
    }

    const nextValues = [...values];
    // Distribute a full 6-digit code across all 6 boxes regardless of which box was pasted into
    const startIndex = digits.length === length ? 0 : index;

    digits.split('').forEach((digit, offset) => {
      if (startIndex + offset < length) {
        nextValues[startIndex + offset] = digit;
      }
    });

    const lastFilledIndex = Math.min(startIndex + digits.length - 1, length - 1);
    updateValues(nextValues, lastFilledIndex);
  };

  return (
    <div
      className="otp-input-group"
      role="group"
      aria-label="Verification code"
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          value={values[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={Boolean(hasError)}
          aria-describedby={hasError && errorId ? errorId : undefined}
          className={`otp-box ${hasError ? 'otp-box--error' : ''}`}
        />
      ))}
    </div>
  );
}

export default OtpInput;
