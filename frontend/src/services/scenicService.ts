import api from './axios';
import type { IScenicPlan } from './types';

export const getScenicOptions = async () => {
  const res = await api.get<Record<string, string[]>>('/scenic/options');
  return res.data;
};

export const getScenicPlans = () => api.get<IScenicPlan[]>('/scenic').then(r => r.data);
export const getScenicPlans = () => api.get<ScenicPlan[]>('/scenic').then(r => r.data);
export const createScenicPlan = (payload: Partial<ScenicPlan> & { partnerId: string }) =>
  api.post<ScenicPlan>('/scenic', payload).then(r => r.data);
export const updateScenicPlan = (id: string, payload: Partial<ScenicPlan>) =>
  api.put<ScenicPlan>(`/scenic/${id}`, payload).then(r => r.data);
export const deleteScenicPlan = (id: string) => api.delete(`/scenic/${id}`);
