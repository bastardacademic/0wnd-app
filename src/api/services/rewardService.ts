export async function applyReward(actionId: string, type: "reward" | "punishment", userId: string) {
  const res = await fetch("/api/rewards/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ actionId, type, userId }),
  });

  if (!res.ok) {
    throw new Error("Failed to apply reward or punishment");
  }

  return await res.json();
}
