// File: src/api/services/journalService.ts
import api from './axios';
import type { JournalEntry, PaginationParams, PaginationResponse } from './types';

export const getJournalEntriesPaginated = async (
  params: PaginationParams & { tags?: string; keyword?: string; from?: string; to?: string }
): Promise<PaginationResponse<JournalEntry>> => {
  const res = await api.get<PaginationResponse<JournalEntry>>('/journal', { params });
  return res.data;
};

export const createJournalEntry = async (payload: { content: string; tags: string[]; mood: number }) =>
  api.post<JournalEntry>('/journal', payload).then(res => res.data);

export const createJournalEntry = async (
  payload: { content: string; tags: string[] }
): Promise<JournalEntry> => {
  const res = await api.post<JournalEntry>('/journal', payload);
  return res.data;
};

export const updateJournalEntry = async (id: string, payload: { content: string; tags: string[]; mood: number }) =>
  api.put<JournalEntry>(`/journal/${id}`, payload).then(res => res.data);

export const updateJournalEntry = async (
  id: string,
  payload: { content: string; tags: string[] }
): Promise<JournalEntry> => {
  const res = await api.put<JournalEntry>(`/journal/${id}`, payload);
  return res.data;
};

export const deleteJournalEntry = async (id: string): Promise<void> => {
  await api.delete(`/journal/${id}`);
};