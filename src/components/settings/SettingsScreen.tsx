import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';
import { AuthContext } from '@/context/AuthContext';
import api from '@/api/axios';

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={`animate-spin ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

const SettingsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user, logout } = useContext(AuthContext);
  const [format, setFormat] = useState<'csv'|'json'|'zip'>('csv');
  const [include, setInclude] = useState({ rituals: true, schedules: true, journals: true, xp: true });
  const [loading, setLoading] = useState(false);
  const [isPurgeOpen, setIsPurgeOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [canRestore, setCanRestore] = useState(false);

  useEffect(() => {
    api.get('/user/restore-status').then(res => setCanRestore(res.data.canRestore));
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPurgeOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isPurgeOpen, countdown]);

  const handleIncludeChange = (key: string) => setInclude(prev => ({ ...prev, [key]: !prev[key] }));

  const handleExport = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('format', format);
    Object.entries(include).forEach(([k, v]) => v && params.append('include', k));
    try {
      const res = await api.get(`/user/export?${params}`, { responseType: format === 'json' ? 'json' : 'blob' });
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '0wnd-data.json';
        link.click();
      } else {
        const blob = new Blob([res.data], { type: format === 'zip' ? 'application/zip' : 'text/csv' });
        const ext = format === 'zip' ? 'zip' : 'csv';
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `0wnd-data.${ext}`;
        link.click();
      }
      toast.success(t('notifications.exportReady'));
    } catch {
      toast.error(t('errors.unexpected'));
    } finally {
      setLoading(false);
    }
  };

  const handlePurgeRequest = async () => {
    setLoading(true);
    try {
      await api.post('/purge-requests');
      toast.success(t('notifications.purgeRequested'));
    } catch {
      toast.error(t('errors.unexpected'));
    } finally {
      setLoading(false);
    }
  };

  const handlePurgeConfirm = async () => {
    setLoading(true);
    await api.delete('/user/purge');
    logout();
  };

  const handleRestore = async () => {
    setLoading(true);
    await api.post('/user/restore');
    setCanRestore(false);
    setLoading(false);
    toast.success(t('notifications.restored'));
  };

  return (
    <section aria-labelledby="settings-heading" className="max-w-md mx-auto p-4 space-y-6">
      <h2 id="settings-heading" className="text-2xl font-bold">
        {t('settings.title')}
      </h2>
      <p>
        <span className="font-semibold">{t('settings.username')}:</span>{' '}
        <span id="username">{user?.username}</span>
      </p>
      <p>
        <span className="font-semibold">{t('settings.role')}:</span>{' '}
        <span>{user?.role}</span>
      </p>

      {/* Export Section */}
      <div>
        <h3 className="font-semibold mb-2">{t('settings.exportOptions')}</h3>
        {['rituals','schedules','journals','xp'].map(key => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={include[key]}
              onChange={() => handleIncludeChange(key)}
              aria-label={t(`settings.include_${key}`)}
            />
            {t(`settings.${key}`)}
          </label>
        ))}
        <div className="mt-2 flex items-center space-x-2">
          <label htmlFor="format-select">{t('settings.format')}:</label>
          <select
            id="format-select"
            value={format}
            onChange={e => setFormat(e.target.value as any)}
            className="bg-gray-800 text-white p-1 rounded"
          >
            {['csv','json','zip'].map(f => (
              <option key={f} value={f}>{f.toUpperCase()}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleExport}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? <Spinner className="w-5 h-5 inline-block" /> : t('buttons.exportData')}
        </button>
      </div>

      {/* Purge Section for Subs */}
      {user?.role === 'Sub' ? (
        <button
          onClick={handlePurgeRequest}
          disabled={loading}
          className="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
        >
          {loading ? <Spinner className="w-5 h-5 inline-block" /> : t('buttons.requestPurge')}
        </button>
      ) : (
        <button
          onClick={() => { setIsPurgeOpen(true); setConfirmText(''); setCountdown(5); }}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          {t('buttons.emergencyPurge')}
        </button>
      )}

      {/* Settings restoration */}
      {canRestore && (
        <button
          onClick={handleRestore}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          {t('buttons.restore')}
        </button>
      )}

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-6 px-4 py-2 bg-gray-600 text-white rounded"
      >
        {t('buttons.logout')}
      </button>

      {/* Purge Confirmation Modal (unchanged) */}
      {/* ...modal code with t() keys for title, labels... */}
    </section>
  );
};

export default SettingsScreen;