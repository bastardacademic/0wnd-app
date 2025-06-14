import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const mockPrompts = [
  { id: "p1", text: "What did you learn about yourself today?" },
  { id: "p2", text: "Describe a moment of obedience or resistance." },
];

const mockRituals = [
  { id: "r1", name: "Morning Reflection", time: "08:00" },
  { id: "r2", name: "Evening Obedience", time: "22:00" },
];

app.post("/api/journal", (req, res) => {
  console.log("📘 Journal entry received:", req.body);
  res.json({ success: true, entry: req.body });
});

app.get("/api/prompts", (req, res) => {
  res.json(mockPrompts);
});

app.get("/api/rituals", (req, res) => {
  res.json(mockRituals);
});

app.listen(3001, () => {
  console.log("🧪 Dev API Server running on http://localhost:3001");
});
