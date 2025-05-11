export async function fetchScheduledRituals() {
  const res = await fetch("/api/scheduled-rituals");
  if (!res.ok) throw new Error("Failed to load rituals");
  return res.json();
}

export async function saveScheduledRitual(ritual) {
  const res = await fetch("/api/scheduled-rituals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ritual),
  });
  if (!res.ok) throw new Error("Failed to save ritual");
  return res.json();
}
