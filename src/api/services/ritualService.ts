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
