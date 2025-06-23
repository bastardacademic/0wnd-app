// File: src/api/services/xpService.ts
import api from './axios';
import type { XP } from './types';

export const getMyXP = async (): Promise<XP> => {
  const res = await api.get<XP>('/xp/me');
  return res.data;
};

export const addXP = async (amount: number): Promise<XP> => {
  const res = await api.post<XP>('/xp/add', { amount });
  return res.data;
};