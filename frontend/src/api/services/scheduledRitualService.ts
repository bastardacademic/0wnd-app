// src/api/services/scheduledRitualsService.ts
import api from './axios';
import type { ScheduledRitual } from './types';

export const createScheduledRitual = async (
  payload: { template: string; scheduledTime: string; outcomes: { onTime: string; late: string; missed: string } }
): Promise<ScheduledRitual> => {
  const res = await api.post<ScheduledRitual>('/scheduled-rituals', payload);
  return res.data;
};

interface ScheduledRitual {
  id: string;
  name: string;
  description: string;
  scheduledFor: string;
  status: "pending" | "completed" | "missed";
}

export const sendProof = (id: string) => api.post(`/scheduled-rituals/${id}/proof-sent`).then(r => r.data);
export const requestProof = (id: string) => api.post(`/scheduled-rituals/${id}/request-proof`).then(r => r.data);
export const approveProof = (id: string) => api.post(`/scheduled-rituals/${id}/proof-approve`).then(r => r.data);
export const getOutcome = (id: string) => api.get<{proofApproved: boolean; outcomeReward: string}>(`/scheduled-rituals/${id}/outcome`).then(r => r.data);

// === Frontend: UI updates in ScheduledRitualsList ===
// After status buttons, add for Sub:
{user?.role === 'Sub' && r.status === 'completed' && !r.proofSent && (
  <button onClick={() => handleSendProof(r.id)} className="px-3 py-1 bg-blue-600 text-white rounded">Send Proof</button>
)}

{user?.role === 'Dom' && r.proofSent && !r.proofApproved && (
  <button onClick={() => handleApproveProof(r.id)} className="px-3 py-1 bg-green-600 text-white rounded">Approve Proof</button>
)}

// Handler implementations:
const handleSendProof = async (id: string) => { await sendProof(id); toast.success('Proof sent'); };
const handleApproveProof = async (id: string) => {
  const { reward } = await approveProof(id);
  toast.success(`Proof approved! Reward: ${reward}`);
};

// And display outcomeReward for Sub when proofApproved:
{user?.role === 'Sub' && r.proofApproved && r.outcomeReward && (
  <div className="mt-2 text-sm text-indigo-700">Reward: {r.outcomeReward}</div>
)}

let scheduledRituals: ScheduledRitual[] = [];

export async function getScheduledRituals(): Promise<ScheduledRitual[]> {
  return scheduledRituals;
}

export async function createScheduledRitual(ritual: Omit<ScheduledRitual, "id" | "status">): Promise<void> {
  scheduledRituals.push({
    ...ritual,
    id: crypto.randomUUID(),
    status: "pending"
  });
}

export async function updateScheduledRitualStatus(id: string, status: "completed" | "missed"): Promise<void> {
  const ritual = scheduledRituals.find(r => r.id === id);
  if (ritual) ritual.status = status;
}

export async function deleteScheduledRitual(id: string): Promise<void> {
  scheduledRituals = scheduledRituals.filter(r => r.id !== id);
}
