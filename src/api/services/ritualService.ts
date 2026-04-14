export interface ScheduledRitual {
  id?: string;
  title: string;
  date: string;
  time?: string;
  repeat?: string;
}

export async function fetchScheduledRituals(): Promise<ScheduledRitual[]> {
  const res = await fetch("/api/rituals/scheduled");
  if (!res.ok) throw new Error("Failed to fetch scheduled rituals");
  return res.json();
}

export async function saveScheduledRitual(ritual: ScheduledRitual): Promise<ScheduledRitual> {
  const res = await fetch("/api/rituals/scheduled", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ritual)
  });

  if (!res.ok) throw new Error("Failed to save ritual");
  return res.json();
}

export interface RitualTemplate {
  name: string;
  description: string;
  rewards: Record<string, unknown>;
  userId: string;
}

export async function createRitualTemplate(ritual: RitualTemplate): Promise<RitualTemplate> {
  const res = await fetch("/api/rituals/templates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ritual)
  });
  if (!res.ok) throw new Error("Failed to create ritual template");
  return res.json();
}
