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

// PATCH /api/user
app.patch("/api/user", (req, res) => {
  const userId = req.headers["x-user-id"];
  const user = mockDb.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });
  Object.assign(user, req.body);
  res.status(200).json(user);
});
