export async function fetchPrompts() {
  const res = await fetch("/api/prompts");
  if (!res.ok) throw new Error("Failed to fetch prompts");
  return await res.json();
}

export async function submitPromptResponse(promptId: string, responseText: string) {
  const res = await fetch("/api/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ promptId, text: responseText }),
  });
  if (!res.ok) throw new Error("Failed to submit response");
}
