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
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");

// POST /api/mfa/setup
app.post("/api/mfa/setup", async (req, res) => {
  const { userId } = req.body;
  const user = mockDb.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const secret = speakeasy.generateSecret({ length: 20 });
  user.mfaSecret = secret.base32;

  const otpAuthUrl = secret.otpauth_url;
  const qr = await qrcode.toDataURL(otpAuthUrl);

  res.json({ qr });
});

// POST /api/mfa/verify
app.post("/api/mfa/verify", (req, res) => {
  const { userId, code } = req.body;
  const user = mockDb.users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  const verified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: "base32",
    token: code
  });

  if (verified) {
    user.mfaEnabled = true;
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});
