import React, { useState } from 'react';
import InputField from './InputField';

/**
 * Lock icon matching the 20x20 stroke style (#737B83) of the asset icons.
 */
const LockIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect
      x="3.75"
      y="9.16667"
      width="12.5"
      height="8.33333"
      rx="2"
      stroke="#737B83"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.25 9.16667V5.83333C6.25 4.83877 6.64509 3.88494 7.34835 3.18168C8.05161 2.47842 9.00544 2.08333 10 2.08333C10.9946 2.08333 11.9484 2.47842 12.6517 3.18168C13.3549 3.88494 13.75 4.83877 13.75 5.83333V9.16667"
      stroke="#737B83"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Reusable PasswordField component with independent show/hide toggle.
 */
function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  placeholder,
  autoComplete = 'new-password',
  error,
  disabled = false,
  isVisible: controlledVisible,
  onToggleVisibility,
}) {
  const [internalVisible, setInternalVisible] = useState(false);

  const isPasswordVisible =
    controlledVisible !== undefined ? controlledVisible : internalVisible;

  const handleToggle = () => {
    if (onToggleVisibility) {
      onToggleVisibility();
    } else {
      setInternalVisible((prev) => !prev);
    }
  };

  return (
    <InputField
      id={id}
      name={name}
      label={label}
      type={isPasswordVisible ? 'text' : 'password'}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      icon={LockIcon}
      error={error}
      disabled={disabled}
      showPasswordToggle
      isPasswordVisible={isPasswordVisible}
      onTogglePassword={handleToggle}
      toggleAriaLabel={
        isPasswordVisible ? `Hide ${label || 'password'}` : `Show ${label || 'password'}`
      }
    />
  );
}

export default PasswordField;
