import { submitXpAward } from "@/api/services/xpService";

export async function createJournalEntry(entry) {
  const res = await fetch("/api/journal", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });

  if (!res.ok) throw new Error("Failed to create journal entry");

  const savedEntry = await res.json();

  await submitXpAward({
    receiverId: entry.userId,
    amount: 5,
    reason: "Journal entry completed",
    source: "journal",
    sourceId: savedEntry.id
  });

  return savedEntry;
}
