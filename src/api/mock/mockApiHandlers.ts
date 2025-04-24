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

// POST /api/ritual-log
app.post("/api/ritual-log", (req, res) => {
  const { ritualId, userId, performedAt, status } = req.body;
  const ritual = mockDb.rituals.find(r => r.id === ritualId);
  if (!ritual) return res.status(404).json({ error: "Ritual not found" });

  const entry = { id: crypto.randomUUID?.() || Math.random().toString(36).slice(2), ritualId, userId, performedAt, status };
  mockDb.ritualLog.push(entry);

  let xp = 0;
  if (status === "active") xp = ritual.xpOnTime;
  if (status === "overdue") xp = ritual.xpLate;
  if (status === "missed") xp = -Math.abs(ritual.xpMissed || 0);

  if (xp !== 0) {
    mockDb.xpLog.push({
      userId,
      amount: xp,
      reason: `⏰ Ritual ${status} – ${ritual.title}`,
      source: "ritual",
      sourceId: ritualId,
      timestamp: performedAt
    });

    const devotion = mockDb.devotion.find(d => d.userId === userId);
    if (devotion) {
      devotion.total += xp;
    } else {
      mockDb.devotion.push({ userId, total: xp, level: 0, label: "✧ Curious" });
    }
  }

  res.status(201).json(entry);
});

// PATCH ritual-log to include action trigger
function runLinkedAction(userId, actionId) {
  const action = mockDb.actions.find(a => a.id === actionId);
  if (!action) return;

  if (action.type === "xp") {
    mockDb.xpLog.push({
      userId,
      amount: action.amount,
      reason: `🔗 Triggered Action – ${action.description}`,
      source: "ritual-action",
      sourceId: action.id,
      timestamp: new Date().toISOString()
    });

    const devotion = mockDb.devotion.find(d => d.userId === userId);
    if (devotion) {
      devotion.total += action.amount;
    } else {
      mockDb.devotion.push({ userId, total: action.amount, level: 0, label: "✧ Curious" });
    }
  }

  if (action.type === "message") {
    console.log(`Message to ${userId}: ${action.message}`);
    // Placeholder for future notification hook
  }
}

// Extend POST /api/ritual-log
const logged = mockDb.ritualLog.at(-1);
const ritual = mockDb.rituals.find(r => r.id === logged.ritualId);
if (ritual && ritual.rewards) {
  const actionId = ritual.rewards[logged.status];
  if (actionId) runLinkedAction(logged.userId, actionId);
}
