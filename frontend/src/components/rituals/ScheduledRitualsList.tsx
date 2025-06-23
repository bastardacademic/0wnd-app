// File: src/components/rituals/ScheduledRitualsList.tsx
import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '@/context/AuthContext';
import {
  getScheduledRituals,
  updateScheduledRitualStatus,
  deleteScheduledRitual
} from '@/api/services/scheduledRitualsService';
import { addXP } from '@/api/services/xpService';
import type { ScheduledRitual } from '@/api/services/types';
import toast from 'react-hot-toast';
import { RescheduleRitualModal } from './RescheduleRitualModal';

export const ScheduledRitualsList: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [rituals, setRituals] = useState<ScheduledRitual[]>([]);
  const [loading, setLoading] = useState(false);
  const [reschedOpen, setReschedOpen] = useState(false);
  const [activeRitual, setActiveRitual] = useState<ScheduledRitual | null>(null);

  useEffect(() => {
    fetchRituals();
  }, []);

  const fetchRituals = async () => {
    setLoading(true);
    try {
      const data = await getScheduledRituals();
      setRituals(data);
    } catch {
      toast.error('Failed to load scheduled rituals');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'completed' | 'missed') => {
    try {
      const updated = await updateScheduledRitualStatus(id, status);
      setRituals(prev => prev.map(r => r.id === id ? updated : r));
      toast.success('Status updated');

      if (status === 'completed') {
        // Award XP for completion
        await addXP(10); // or use updated.template.xpReward
        toast.success('You earned 10 XP!');
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this scheduled ritual?')) return;
    try {
      await deleteScheduledRitual(id);
      setRituals(prev => prev.filter(r => r.id !== id));
      toast.success('Ritual deleted');
    } catch {
      toast.error('Failed to delete ritual');
    }
  };

  const openReschedule = (ritual: ScheduledRitual) => {
    setActiveRitual(ritual);
    setReschedOpen(true);
  };

  const handleRescheduleSuccess = (updated: ScheduledRitual) => {
    setRituals(prev => prev.map(r => r.id === updated.id ? updated : r));
    setReschedOpen(false);
    setActiveRitual(null);
  };

  if (loading) return <p className="p-4">Loading rituals...</p>;

  return (
    <div className="space-y-4">
      {rituals.map(r => (
        <div key={r.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow flex justify-between items-center">
          <div>
            <h4 className="font-semibold text-lg">{r.template.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {format(new Date(r.scheduledTime), 'PPPpp')} • <span className={
                r.status === 'completed' ? 'text-green-500' :
                r.status === 'missed'    ? 'text-red-500'   :
                                            'text-yellow-500'
              }>
                {r.status}
              </span>
            </p>
          </div>

          {(user?.role === 'Dom' || user?.role === 'Switch') && (
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusUpdate(r.id, 'completed')}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-500"
              >Complete</button>

              <button
                onClick={() => handleStatusUpdate(r.id, 'missed')}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500"
              >Missed</button>

              <button
                onClick={() => openReschedule(r)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-400"
              >Reschedule</button>

              <button
                onClick={() => handleDelete(r.id)}
                className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-500"
              >Delete</button>
            </div>
          )}
        </div>
      ))}

      {/* Reschedule Modal */}
      {activeRitual && (
        <RescheduleRitualModal
          isOpen={reschedOpen}
          onClose={() => setReschedOpen(false)}
          ritual={activeRitual}
          onSuccess={handleRescheduleSuccess}
        />
      )}
    </div>
  );
};
