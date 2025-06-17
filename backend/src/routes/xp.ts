// File: backend/src/routes/xp.ts
import { Router } from 'express';
import XP from '../models/XP';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';

const router = Router();
router.use(authenticateToken);

// GET /api/xp => all authenticated users
router.get('/', async (req: AuthRequest, res) => {
  const { userId } = req.query;
  const xp = await XP.findOne({ user: userId });
  res.json(xp);
});

// POST /api/xp => only Dom or Switch can award XP
router.post('/', authorizeRole('Dom', 'Switch'), async (req, res) => {
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