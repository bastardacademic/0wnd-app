import express from "express";
import { mockDb } from "./mockDb";

const app = express();
app.use(express.json());

// GET /api/prompts
app.get("/api/prompts", (req, res) => {
  res.json(mockDb.prompts);
});

// POST /api/prompts
app.post("/api/prompts", (req, res) => {
  const prompt = { id: Math.random().toString(36).substring(2), ...req.body };
  mockDb.prompts.push(prompt);
  res.status(201).json(prompt);
});

// POST /api/promptResponses
app.post("/api/promptResponses", (req, res) => {
  mockDb.promptResponses.push(req.body);
  res.status(201).json({ success: true });
});

export default app;

// POST /api/audio
app.post("/api/audio", (req, res) => {
  const clip = {
    id: Math.random().toString(36).slice(2),
    unlocked: true,
    unlockedAt: new Date().toISOString(),
    ...req.body
  };
  mockDb.audioClips.push(clip);
  res.status(201).json(clip);
});

// GET /api/audio
app.get("/api/audio", (req, res) => {
  const userId = req.headers["x-user-id"];
  const unlocked = mockDb.audioClips.filter(c => !c.subId || c.subId === userId);
  res.json(unlocked);
});
