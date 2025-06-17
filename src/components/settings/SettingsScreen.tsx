import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import api from '@/api/axios';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
  </svg>
);

const SettingsScreen: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const [format, setFormat] = useState<'csv'|'json'|'zip'>('csv');
  const [include, setInclude] = useState({ rituals: true, schedules: true, journals: true, xp: true });
  const [loading, setLoading] = useState(false);
  const [isPurgeOpen, setIsPurgeOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [countdown, setCountdown] = useState(5);
  const [canRestore, setCanRestore] = useState(false);

  // Preview state
  const [previewData, setPreviewData] = useState<Record<string, any[]>>({});
  const [showPreview, setShowPreview] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);

  useEffect(() => {
    api.get('/user/restore-status').then(res => setCanRestore(res.data.canRestore));
  }, []);

  // Purge countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPurgeOpen && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [isPurgeOpen, countdown]);

  const handleIncludeChange = (key: string) => setInclude(prev => ({ ...prev, [key]: !prev[key] }));

  const triggerDownload = (blob: Blob, ext: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `0wnd-data.${ext}`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleExport = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.append('format', format);
    Object.entries(include).forEach(([k, v]) => v && params.append('include', k));
    try {
      const res = await api.get(`/user/export?${params}`, { responseType: format === 'json' ? 'json' : 'blob' });
      if (format === 'json') {
        const blob = new Blob([JSON.stringify(res.data, null, 2)], { type: 'application/json' });
        triggerDownload(blob, 'json');
      } else {
        triggerDownload(new Blob([res.data]), format);
      }
      toast.success('Export ready!');
    } catch {
      toast.error('Export failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = async () => {
    setPreviewLoading(true);
    setShowPreview(true);
    const params = new URLSearchParams();
    params.append('format', 'json');
    Object.entries(include).forEach(([k, v]) => v && params.append('include', k));
    try {
      const res = await api.get(`/user/export?${params}`, { responseType: 'json' });
      // Take first 5 rows per section
      const preview: Record<string, any[]> = {};
      Object.entries(res.data).forEach(([section, arr]) => {
        preview[section] = Array.isArray(arr) ? arr.slice(0, 5) : [arr];
      });
      setPreviewData(preview);
    } catch {
      toast.error('Preview failed');
      setShowPreview(false);
    } finally {
      setPreviewLoading(false);
    }
  };

  const handleEmail = async () => {
    toast.loading('Emailing export...');
    try {
      await api.post('/user/email-export', { format, include: Object.keys(include).filter(k => include[k]) });
      toast.dismiss();
      toast.success('Email sent!');
    } catch {
      toast.dismiss();
      toast.error('Email failed');
    }
  };

  const handlePurgeConfirm = async () => {
    setLoading(true);
    await api.delete('/user/purge');
    logout();
  };

  const handlePurgeRequest = async () => {
   setLoading(true);
   try {
     await api.post('/purge-requests');
     toast.success('Purge request submitted for approval');
   } catch {
     toast.error('Failed to submit purge request');
   } finally {
     setLoading(false);
   }
 };

 {user?.role === 'Sub' ? (
   <button
     onClick={handlePurgeRequest}
     disabled={loading}
     className="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-50"
   >
     Request Data Purge
   </button>
 ) : (
   <button
     onClick={() => { setIsPurgeOpen(true); setCountdown(5); setConfirmText(''); }}
     className="px-4 py-2 bg-red-600 text-white rounded"
   >
     Emergency Data Purge
   </button>
 )}

  const handleRestore = async () => {
    setLoading(true);
    await api.post('/user/restore');
    setCanRestore(false);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-6 text-gray-900 dark:text-gray-100">
      <h2 className="text-2xl font-bold">Settings</h2>

      <p><strong>Username:</strong> {user?.username}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      {/* Export Section */}
      <div className="space-y-2">
        <h3 className="font-semibold">Export Options</h3>
        {Object.keys(include).map(key => (
          <label key={key} className="flex items-center">
            <input type="checkbox" className="mr-2" checked={include[key]} onChange={() => handleIncludeChange(key)} />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
        <div className="mt-2 flex items-center space-x-2">
  <label>Format:</label>
  {/* Only Sub users can download CSV; Dom/Switch see all options */}
  {(() => {
    const formats = user?.role === 'Sub' ? ['csv'] : ['csv', 'json', 'zip'];
    return (
      <select
        value={format}
        onChange={e => setFormat(e.target.value as any)}
        className="bg-gray-800 text-white p-1 rounded"
      >
        {formats.map(f => (
          <option key={f} value={f}>
            {f.toUpperCase()}
          </option>
        ))}
      </select>
    );
  })()}
  <button
    onClick={handlePreview}
    disabled={previewLoading}
    className="px-3 py-1 bg-gray-600 text-white rounded disabled:opacity-50"
  >
    {previewLoading ? <Spinner className="w-4 h-4" /> : 'Preview'}
  </button>
</div>
        <div className="flex space-x-2">
          <button onClick={handleExport} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
            {loading ? <Spinner className="w-5 h-5" /> : 'Export My Data'}
          </button>
          <button onClick={handleEmail} disabled={loading} className="px-4 py-2 bg-teal-600 text-white rounded disabled:opacity-50">
            Email Me
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <Dialog open={true} onClose={() => setShowPreview(false)} className="fixed inset-0 z-50 flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <div className="bg-white dark:bg-gray-800 rounded p-4 z-10 max-w-lg w-full overflow-auto">
            <Dialog.Title className="text-lg font-bold mb-4">Data Preview (first 5 rows)</Dialog.Title>
            {Object.entries(previewData).map(([section, rows]) => (
              <div key={section} className="mb-4">
                <h4 className="font-semibold mb-2">{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto">
                  {JSON.stringify(rows, null, 2)}
                </pre>
              </div>
            ))}
            <button onClick={() => setShowPreview(false)} className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Close</button>
          </div>
        </Dialog>
      )}

      {/* Purge & Restore & Logout (unchanged) */}
      {/* ... rest of component ... */}
    </div>
  );
};

export default SettingsScreen;