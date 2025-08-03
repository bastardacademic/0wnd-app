// src/components/rituals/ScheduleRitualModal.tsx
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { createScheduledRitual } from '@/api/services/scheduledRitualsService';
import toast from 'react-hot-toast';
import type { RitualTemplate } from '@/api/services/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (ritual: any) => void;
  templates: RitualTemplate[];
}

export const ScheduleRitualModal: React.FC<Props> = ({ isOpen, onClose, onSuccess, templates }) => {
  const [templateId, setTemplateId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [outcomes, setOutcomes] = useState({ onTime: '', late: '', missed: '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const iso = new Date(`${date}T${time}:00`).toISOString();
      const ritual = await createScheduledRitual({ template: templateId, scheduledTime: iso, outcomes });
      onSuccess(ritual);
      toast.success('Scheduled ritual created');
      onClose();
    } catch {
      toast.error('Failed to schedule');
    } finally { setSaving(false); }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 flex items-center justify-center z-50">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white dark:bg-gray-800 rounded p-6 w-full max-w-lg space-y-4">
        <Dialog.Title className="text-xl font-semibold">Schedule Ritual</Dialog.Title>
        <select value={templateId} onChange={e => setTemplateId(e.target.value)} className="w-full p-2 rounded border">
          <option value="">Select template</option>
          {templates.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>
        <div className="flex space-x-2">
          <input type="date" value={date} onChange={e=>setDate(e.target.value)} className="flex-1 p-2 rounded border" />
          <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="flex-1 p-2 rounded border" />
        </div>
        {/* Outcome assignments */}
        <div className="space-y-2">
          <label className="font-medium">On-Time Reward</label>
          <input type="text" value={outcomes.onTime} onChange={e=>setOutcomes(o=>({...o,onTime:e.target.value}))} className="w-full p-2 rounded border" />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Late Punishment</label>
          <input type="text" value={outcomes.late} onChange={e=>setOutcomes(o=>({...o,late:e.target.value}))} className="w-full p-2 rounded border" />
        </div>
        <div className="space-y-2">
          <label className="font-medium">Missed Punishment</label>
          <input type="text" value={outcomes.missed} onChange={e=>setOutcomes(o=>({...o,missed:e.target.value}))} className="w-full p-2 rounded border" />
        </div>
        <div className="flex justify-end space-x-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
            {saving ? 'Saving...' : 'Create'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

};
