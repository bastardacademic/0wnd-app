export async function createScheduledRitual(data) {
  const res = await fetch("/api/scheduled-rituals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create scheduled ritual");
  return res.json();
}

export async function fetchScheduledRituals() {
  const res = await fetch("/api/scheduled-rituals");
  if (!res.ok) throw new Error("Failed to fetch scheduled rituals");
  return res.json();
}

export async function deleteScheduledRitual(id) {
  const res = await fetch(`/api/scheduled-rituals/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete scheduled ritual");
}
