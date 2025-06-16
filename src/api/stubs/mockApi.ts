// File: src/api/stubs/mockApi.ts
// Central mock API layer to replace MSW handlers

import ritualsData from './fixtures/rituals.json';
import schedulesData from './fixtures/schedules.json';
import xpData from './fixtures/xp.json';
import journalData from './fixtures/journal.json';

// Simulate network latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function fetchRitualTemplates() {
  await delay(200);
  return [...ritualsData];
}

export async function postRitualTemplate(template: Partial<{ name: string; description?: string; outcomes: any }>) {
  await delay(150);
  const newRitual = {
    id: `ritual-${Date.now()}`,
    name: template.name || 'Untitled',
    description: template.description || '',
    outcomes: template.outcomes || { onTime: {}, late: {}, missed: {} }
  };
  ritualsData.push(newRitual as any);
  return newRitual;
}

export async function fetchScheduledRituals() {
  await delay(200);
  return [...schedulesData];
}

export async function postSchedule(payload: { ritualId: string; scheduledFor: string }) {
  await delay(150);
  const newSched = {
    id: `sched-${Date.now()}`,
    ritualId: payload.ritualId,
    scheduledFor: payload.scheduledFor,
    status: 'pending'
  };
  schedulesData.push(newSched as any);
  return newSched;
}

export async function postCompleteRitual(id: string) {
  await delay(100);
  return { success: true };
}

export async function fetchXP() {
  await delay(150);
  return { ...xpData };
}

export async function updateXP(amount: number) {
  await delay(100);
  xpData.currentXP += amount;
  if (xpData.currentXP >= xpData.nextLevelXP) {
    xpData.level++;
    xpData.currentXP -= xpData.nextLevelXP;
    xpData.nextLevelXP = xpData.level * 100;
  }
  return { ...xpData };
}

export async function fetchJournalEntries() {
  await delay(200);
  return [...journalData];
}

export async function postJournalEntry(entry: Partial<{ mood: string; tags: string[]; content: string }>) {
  await delay(150);
  const newEntry = {
    id: `journal-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...entry,
  };
  journalData.push(newEntry as any);
  return newEntry;
}