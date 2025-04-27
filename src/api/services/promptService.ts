import axios from "axios";

export async function getPrompts() {
  const res = await axios.get("/api/prompts");
  return res.data;
}

export async function submitPromptResponse(promptId: string, response: string) {
  const res = await axios.post("/api/promptResponses", {
    promptId,
    response,
  });
  return res.data;
}
