import React, { useEffect, useRef } from 'react';
import './OtpInputGroup.css';

/**
 * Reusable 6-digit OTP input group component.
 *
 * Props:
 * - value: array of digit strings (or 6-char string)
 * - onChange: callback receiving the updated array of digit strings
 * - onComplete: optional callback invoked with the full 6-digit string when filled
 * - length: number of OTP boxes (default 6)
 * - status: 'default' | 'error' | 'valid'
 * - disabled: boolean
 * - errorId: optional id of the error message element for aria-describedby
 */
function OtpInputGroup({
  value,
  values: legacyValues,
  onChange,
  onComplete,
  length = 6,
  status = 'default',
  hasError = false,
  disabled = false,
  errorId,
}) {
  const inputRefs = useRef([]);
  const lastCompletedCodeRef = useRef('');

  const resolvedStatus =
    status !== 'default' ? status : hasError ? 'error' : 'default';
  const isError = resolvedStatus === 'error';
  const isValid = resolvedStatus === 'valid';

  const rawValues = value !== undefined ? value : legacyValues;
  const digitsArray = Array.isArray(rawValues)
    ? rawValues
    : typeof rawValues === 'string'
    ? Array.from({ length }, (_, idx) => rawValues[idx] || '')
    : Array(length).fill('');

  // Auto-focus the first box on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  // Reset lastCompletedCodeRef when inputs are cleared so user can re-enter
  useEffect(() => {
    const joined = digitsArray.join('');
    if (joined.length < length) {
      lastCompletedCodeRef.current = '';
    }
    if (isError && joined.length === 0 && inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [digitsArray, length, isError, disabled]);

  const focusInput = (index) => {
    const clampedIndex = Math.max(0, Math.min(length - 1, index));
    const target = inputRefs.current[clampedIndex];
    if (target) {
      target.focus();
      target.select?.();
    }
  };

  const updateValues = (nextValues, nextFocusIndex) => {
    onChange?.(nextValues);

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
      const nextValues = [...digitsArray];
      nextValues[index] = '';
      updateValues(nextValues);
      return;
    }

    if (digitsOnly.length > 1) {
      const nextValues = [...digitsArray];
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

    const digit = digitsOnly.slice(-1);
    const nextValues = [...digitsArray];
    nextValues[index] = digit;

    const nextFocus = index < length - 1 ? index + 1 : index;
    updateValues(nextValues, nextFocus);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const nextValues = [...digitsArray];

      if (digitsArray[index]) {
        nextValues[index] = '';
        updateValues(nextValues, index);
      } else if (index > 0) {
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

    if (/^[0-9]$/.test(e.key) && digitsArray[index]) {
      e.preventDefault();
      const nextValues = [...digitsArray];
      nextValues[index] = e.key;
      const nextFocus = index < length - 1 ? index + 1 : index;
      updateValues(nextValues, nextFocus);
      return;
    }

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

    const nextValues = [...digitsArray];
    const startIndex = digits.length === length ? 0 : index;

    digits.split('').forEach((digit, offset) => {
      if (startIndex + offset < length) {
        nextValues[startIndex + offset] = digit;
      }
    });

    const lastFilledIndex = Math.min(
      startIndex + digits.length - 1,
      length - 1
    );
    updateValues(nextValues, lastFilledIndex);
  };

  const statusModifier = isError
    ? 'otp-box--error'
    : isValid
    ? 'otp-box--valid'
    : '';

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
          value={digitsArray[index] || ''}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={isError}
          aria-describedby={isError && errorId ? errorId : undefined}
          className={`otp-box ${statusModifier}`.trim()}
        />
      ))}
    </div>
  );
}

export default OtpInputGroup;
