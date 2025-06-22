import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '@/context/AuthContext';
import { getRitualTemplates } from '@/api/services/ritualService';
import type { RitualTemplate } from '@/api/services/types';
import { EditRitualTemplateModal } from './EditRitualTemplateModal';

export const RitualsScreen: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [rituals, setRituals] = useState<RitualTemplate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<RitualTemplate | undefined>(undefined);

  useEffect(() => {
    getRitualTemplates().then(setRituals);
  }, []);

  const handleNew = () => {
    setSelectedTemplate(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (template: RitualTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const handleSave = (saved: RitualTemplate) => {
    setRituals(prev => {
      const exists = prev.find(tpl => tpl.id === saved.id);
      if (exists) {
        return prev.map(tpl => (tpl.id === saved.id ? saved : tpl));
      }
      return [...prev, saved];
    });
  };

  return (
    <section aria-labelledby="rituals-heading">
      <h2 id="rituals-heading" className="text-2xl font-bold mb-4">
        {t('rituals.title')}
      </h2>

      {user?.role === 'Dom' && (
        <button
          onClick={handleNew}
          aria-label={t('buttons.newRitual')}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500"
        >
          {t('buttons.newRitual')}
        </button>
      )}

      <ul className="space-y-2">
        {rituals.map(r => (
          <li key={r.id} className="p-4 border rounded bg-white dark:bg-gray-800">
            <h3 className="font-semibold text-lg">{r.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{r.description}</p>
            {user?.role === 'Dom' && (
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleEdit(r)}
                  aria-label={t('buttons.edit')}
                  className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-400"
                >
                  {t('buttons.edit')}
                </button>
                <button
                  aria-label={t('buttons.delete')}
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-400"
                >
                  {t('buttons.delete')}
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      <EditRitualTemplateModal
        isOpen={isModalOpen}
        template={selectedTemplate}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </section>
  );
};