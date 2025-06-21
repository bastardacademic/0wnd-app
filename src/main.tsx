import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import App from './App';
import { AuthProvider } from '@/context/AuthContext';
import { ErrorBoundary } from '@/components/ErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <I18nextProvider i18n={i18n}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </I18nextProvider>
  </AuthProvider>
);

// Example update in SettingsScreen.tsx for i18n and accessibility:
import { useTranslation } from 'react-i18next';

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section aria-labelledby="settings-heading" className="...">
      <h2 id="settings-heading" className="text-2xl font-bold">{t('settings.title')}</h2>
      <label htmlFor="username" className="sr-only">{t('settings.username')}</label>
      <p id="username" className="...">{user?.username}</p>
      {/* Buttons with aria-labels */}
      <button aria-label={t('buttons.exportData')}>
        {t('buttons.exportData')}
      </button>
    </section>
  );
};