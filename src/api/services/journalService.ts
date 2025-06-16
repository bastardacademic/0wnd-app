// File: src/api/services/journalService.ts
import axios from 'axios';
import * as mockApi from '../stubs/mockApi';
import type { JournalEntry } from './types';

export async function getJournalEntries(): Promise<JournalEntry[]> {
  return process.env.NODE_ENV === 'development'
    ? mockApi.fetchJournalEntries()
    : (await axios.get<JournalEntry[]>(`${import.meta.env.VITE_API_URL}/journal`)).data;
}

export async function createJournalEntry(
  entry: Omit<JournalEntry, 'id' | 'createdAt'>
): Promise<JournalEntry> {
  return process.env.NODE_ENV === 'development'
    ? mockApi.postJournalEntry(entry)
    : (await axios.post<JournalEntry>(`${import.meta.env.VITE_API_URL}/journal`, entry)).data;
}