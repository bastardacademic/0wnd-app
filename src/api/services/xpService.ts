// File: src/api/services/xpService.ts
import axios from 'axios';
import * as mockApi from '../stubs/mockApi';
import type { XPData } from './types';

export async function getXP(): Promise<XPData> {
  return process.env.NODE_ENV === 'development'
    ? mockApi.fetchXP()
    : (await axios.get<XPData>(`${import.meta.env.VITE_API_URL}/xp`)).data;
}

export async function addXP(amount: number): Promise<XPData> {
  return process.env.NODE_ENV === 'development'
    ? mockApi.updateXP(amount)
    : (await axios.post<XPData>(`${import.meta.env.VITE_API_URL}/xp`, { amount })).data;
}