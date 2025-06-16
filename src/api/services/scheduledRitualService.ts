// src/api/services/scheduledRitualsService.ts
interface ScheduledRitual {
  id: string;
  name: string;
  description: string;
  scheduledFor: string;
  status: "pending" | "completed" | "missed";
}

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
