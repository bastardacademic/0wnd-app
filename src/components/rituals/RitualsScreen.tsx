import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { getRitualTemplates, createRitualTemplate, completeRitual } from '@/api/services/ritualService';
import { RitualTemplate } from '@/api/services/types';
import { EditRitualTemplateModal } from '@/components/rituals/EditRitualTemplateModal';

export const RitualsScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const isController = user?.role === 'Dom' || user?.role === 'Switch';
{isController && <button>Edit</button>}
  const [rituals, setRituals] = useState<RitualTemplate[]>([]);

  useEffect(() => {
    getRitualTemplates().then(setRituals);
  }, []);

  <EditRitualTemplateModal
  isOpen={isEditOpen}
  template={selectedTemplate}
  onClose={() => setEditOpen(false)}
  onSave={updated => {
    // update local state list
  }}
/>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ritual Templates</h2>
      {user?.role === 'Dom' && (
        <button className="mb-4 px-4 py-2 bg-green-600 text-white rounded" onClick={() => {/* open create modal */}}>
          New Ritual Template
        </button>
      )}
      <ul>
        {rituals.map(r => (
          <li key={r.id} className="mb-2 p-4 border rounded">
            <h3 className="font-semibold">{r.name}</h3>
            <p className="text-sm text-gray-600">{r.description}</p>
            {user?.role === 'Dom' && (
              <div className="mt-2 space-x-2">
                <button className="px-2 py-1 bg-blue-500 text-white rounded">Edit</button>
                <button className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );  
};