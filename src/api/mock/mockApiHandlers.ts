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

// POST /api/burn
app.post("/api/burn", (req, res) => {
  const { id, type } = req.body;

  const collections = {
    journal: mockDb.journals,
    ritual: mockDb.ritualLog,
    prompt: mockDb.promptResponses,
  };

  const collection = collections[type];
  if (!collection) return res.status(400).json({ error: "Invalid type" });

  const index = collection.findIndex(e => e.id === id);
  if (index !== -1) {
    collection.splice(index, 1);
    return res.status(200).json({ burned: true });
  }

  res.status(404).json({ burned: false });
});

// POST /api/emergency-wipe
app.post("/api/emergency-wipe", (req, res) => {
  const { userId } = req.body;

  mockDb.users = mockDb.users.filter(u => u.id !== userId);
  mockDb.journals = mockDb.journals.filter(j => j.userId !== userId);
  mockDb.ritualLog = mockDb.ritualLog.filter(r => r.userId !== userId);
  mockDb.promptResponses = mockDb.promptResponses.filter(p => p.userId !== userId);
  mockDb.devotion = mockDb.devotion.filter(d => d.userId !== userId);
  mockDb.xpLog = mockDb.xpLog.filter(x => x.userId !== userId);

  res.status(200).json({ success: true });
});
