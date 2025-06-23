// File: src/api/services/scheduledRitualsService.ts
import api from './axios';
import type { ScheduledRitual } from './types';

export const updateScheduledRitualDate = async (
  id: string,
  scheduledTime: string
): Promise<ScheduledRitual> => {
  const res = await api.put<ScheduledRitual>(`/scheduled-rituals/${id}`, { scheduledTime });
  return res.data;
};