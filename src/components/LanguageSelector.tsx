// File: src/components/LanguageSelector.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

// Supported languages and their display labels
const languages: { code: string; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'it', label: 'Italiano' },
  { code: 'pt', label: 'Português' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'sv', label: 'Svenska' },
  { code: 'da', label: 'Dansk' },
  { code: 'nb', label: 'Norsk (Bokmål)' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'ru', label: 'Русский' },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLng = e.target.value;
    i18n.changeLanguage(newLng);
    localStorage.setItem('i18nextLng', newLng);
  };

  return (
    <select
      aria-label="Select language"
      value={i18n.language}
      onChange={handleChange}
      className="bg-gray-800 text-white p-1 rounded"
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
