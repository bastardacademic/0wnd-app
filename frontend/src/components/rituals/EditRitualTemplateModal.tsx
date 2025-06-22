import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { RitualTemplate } from '@/api/services/types';
import { createRitualTemplate, getRitualTemplates } from '@/api/services/ritualService';
import { AudioPromptUploader } from '@/components/rituals/AudioPromptUploader';

interface EditRitualTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: RitualTemplate;
  onSave: (updated: RitualTemplate) => void;
}

export const EditRitualTemplateModal: React.FC<EditRitualTemplateModalProps> = ({ isOpen, onClose, template, onSave }) => {
  const [name, setName] = useState(template?.name || '');
  const [description, setDescription] = useState(template?.description || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (template) {
      setName(template.name);
      setDescription(template.description || '');
    }
  }, [template]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = { name, description, outcomes: template?.outcomes || {} };
      const saved = template
        ? await createRitualTemplate(payload)
        : await createRitualTemplate(payload);
      onSave(saved);
      onClose();
    } catch (e) {
      console.error(e);
      // show error toast if desired
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 flex items-center justify-center">
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-lg space-y-4 shadow-lg">
        <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          {template ? 'Edit Ritual Template' : 'New Ritual Template'}
        </Dialog.Title>
        <div className="space-y-2">
          <label className="block text-gray-700 dark:text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none h-24"
          />
        </div>
        {/* Audio prompts section */}
        {template && (
          <AudioPromptUploader ritualId={template.id} />
        )}
        <div className="flex justify-end space-x-2 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-100 rounded hover:bg-gray-400"
          >Cancel</button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-500"
          >{saving ? 'Saving...' : 'Save'}</button>
        </div>
      </div>
    </Dialog>
  );
};