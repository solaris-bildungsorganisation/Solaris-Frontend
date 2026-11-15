import React from 'react';
import './PasswordStrengthMeter.css';

/**
 * Pure helper evaluating the 3 password requirements and returning
 * individual flags plus the total score (0..3).
 *
 * @param {string} password
 * @returns {{ minLength: boolean, hasNumber: boolean, hasSymbol: boolean, score: number }}
 */
export function getPasswordChecks(password = '') {
  const value = typeof password === 'string' ? password : '';
  const minLength = value.length >= 8;
  const hasNumber = /\d/.test(value);
  const hasSymbol = /[^A-Za-z0-9]/.test(value);
  const score =
    (minLength ? 1 : 0) + (hasNumber ? 1 : 0) + (hasSymbol ? 1 : 0);

  return {
    minLength,
    hasNumber,
    hasSymbol,
    score,
  };
}

/**
 * Reusable password strength meter bar and 3-item requirements checklist.
 */
function PasswordStrengthMeter({ password = '' }) {
  const { minLength, hasNumber, hasSymbol, score } = getPasswordChecks(password);

  const requirements = [
    { id: 'minLength', label: '8 characters minimum', met: minLength },
    { id: 'hasNumber', label: 'a number', met: hasNumber },
    { id: 'hasSymbol', label: 'a symbol', met: hasSymbol },
  ];

  return (
    <div className="password-strength-meter">
      {/* 1. Strength Progress Bar */}
      <div
        className="password-strength-track"
        role="progressbar"
        aria-label="Password strength"
        aria-valuemin={0}
        aria-valuemax={3}
        aria-valuenow={score}
      >
        <div
          className={`password-strength-fill password-strength-fill--score-${score}`}
        />
      </div>

      {/* 2. Requirements Checklist */}
      <ul
        className="password-requirements-list"
        aria-label="Password requirements"
      >
        {requirements.map((item) => (
          <li
            key={item.id}
            className={`password-requirement-item ${
              item.met ? 'password-requirement-item--met' : ''
            }`.trim()}
          >
            <span
              className="password-requirement-indicator"
              aria-hidden="true"
            >
              {item.met && (
                <svg
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.5 4.5L4.1 7.1L9.5 1.5"
                    stroke="#FFFFFF"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <span className="password-requirement-label">{item.label}</span>
            <span className="sr-only">
              {item.met ? ' (met)' : ' (not met)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordStrengthMeter;
