// File: backend/src/routes/xp.ts
import { Router } from 'express';
import XP from '../models/XP';

const router = Router();

// GET /api/xp?userId=
router.get('/', async (req, res) => {
  const { userId } = req.query;
  const xp = await XP.findOne({ user: userId });
  res.json(xp);
});

// POST /api/xp
router.post('/', async (req, res) => {
  const { userId, amount } = req.body;
  let xp = await XP.findOne({ user: userId });
  if (!xp) xp = new XP({ user: userId });
  xp.currentXP += amount;
  if (xp.currentXP >= xp.nextLevelXP) {
    xp.level++;
    xp.currentXP -= xp.nextLevelXP;
    xp.nextLevelXP = xp.level * 100;
  }
  const saved = await xp.save();
  res.json(saved);
});

export default router;