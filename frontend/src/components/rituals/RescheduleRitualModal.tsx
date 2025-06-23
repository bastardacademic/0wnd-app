// File: src/components/rituals/RescheduleRitualModal.tsx
import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { updateScheduledRitualDate } from '@/api/services/scheduledRitualsService';
import toast from 'react-hot-toast';
import { ScheduledRitual } from '@/api/services/types';

interface RescheduleRitualModalProps {
  isOpen: boolean;
  onClose: () => void;
  ritual: ScheduledRitual;
  onSuccess: (updated: ScheduledRitual) => void;
}

export const RescheduleRitualModal: React.FC<RescheduleRitualModalProps> = ({ isOpen, onClose, ritual, onSuccess }) => {
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (ritual) {
      const dt = new Date(ritual.scheduledTime);
      setNewDate(dt.toISOString().slice(0,10));
      setNewTime(dt.toISOString().slice(11,16));
    }
  }, [ritual]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const iso = new Date(`${newDate}T${newTime}:00`).toISOString();
      const updated = await updateScheduledRitualDate(ritual.id, iso);
      onSuccess(updated);
      toast.success('Ritual rescheduled');
      onClose();
    } catch {
      toast.error('Failed to reschedule');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md space-y-4 shadow-lg">
        <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-gray-100">Reschedule Ritual</Dialog.Title>
        <div className="space-y-2">
          <label htmlFor="resched-date" className="block text-gray-700 dark:text-gray-300">New Date</label>
          <input
            id="resched-date"
            type="date"
            value={newDate}
            onChange={e => setNewDate(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="resched-time" className="block text-gray-700 dark:text-gray-300">New Time</label>
          <input
            id="resched-time"
            type="time"
            value={newTime}
            onChange={e => setNewTime(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50 hover:bg-green-500">{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Dialog>
  );
};