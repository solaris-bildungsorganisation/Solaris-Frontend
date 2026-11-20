import React, { useState } from 'react';

const LANGUAGES = [
  { value: 'en', label: 'English (en)' },
  { value: 'ar', label: 'العربية (ar)' },
  { value: 'fr', label: 'Français (fr)' },
];

/**
 * Compact white pill language selector shown in the top-right corner of the form panel.
 */
function LanguageSelect({ value: controlledValue, onChange }) {
  const [internalLang, setInternalLang] = useState('en');
  const selectedLang = controlledValue !== undefined ? controlledValue : internalLang;

  const handleChange = (e) => {
    const nextValue = e.target.value;
    if (onChange) {
      onChange(nextValue);
    } else {
      setInternalLang(nextValue);
    }
  };

  return (
    <div className="language-select-wrapper">
      <select
        aria-label="Select language"
        className="language-select"
        value={selectedLang}
        onChange={handleChange}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
      <span className="language-select-chevron" aria-hidden="true">
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="#374151"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </div>
  );
}

export default LanguageSelect;
