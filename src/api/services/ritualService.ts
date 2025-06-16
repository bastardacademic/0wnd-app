// File: src/api/services/ritualService.ts
import axios from 'axios';
import * as mockApi from '../stubs/mockApi';
import type { RitualTemplate, ScheduledRitual } from './types';

const USE_MOCK = process.env.NODE_ENV === 'development';
const API_BASE = import.meta.env.VITE_API_URL;

export async function getRitualTemplates(): Promise<RitualTemplate[]> {
  return USE_MOCK
    ? mockApi.fetchRitualTemplates()
    : (await axios.get<RitualTemplate[]>(`${API_BASE}/rituals`)).data;
}

export async function getScheduledRituals(): Promise<ScheduledRitual[]> {
  return USE_MOCK
    ? mockApi.fetchScheduledRituals()
    : (await axios.get<ScheduledRitual[]>(`${API_BASE}/schedule`)).data;
}

export async function completeRitual(id: string): Promise<void> {
  return USE_MOCK
    ? void (await mockApi.postCompleteRitual(id))
    : void (await axios.post(`${API_BASE}/schedule/${id}/complete`));
}