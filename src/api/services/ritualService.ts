import { submitXpAward } from "@/api/services/xpService";

export async function createRitualTemplate(ritual) {
  const res = await fetch("/api/rituals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ritual),
  });

  if (!res.ok) throw new Error("Failed to create ritual");

  const savedRitual = await res.json();

  await submitXpAward({
    receiverId: ritual.userId,
    amount: 10,
    reason: "Ritual created",
    source: "ritual",
    sourceId: savedRitual.id
  });

  return savedRitual;
}
