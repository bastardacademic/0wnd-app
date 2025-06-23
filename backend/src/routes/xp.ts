// File: backend/src/routes/xp.ts
import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import XP from '../models/XP';
import { levels } from '../config/levels';

const router = Router();
router.use(authenticateToken);

// Helper to recalculate level
function calculateLevel(points: number): { level: number; badge: string } {
  let lvl = 1;
  let badge = levels[0].badge;
  for (let i = levels.length - 1; i >= 0; i--) {
    if (points >= levels[i].threshold) {
      lvl = i + 1;
      badge = levels[i].badge;
      break;
    }
  }
  return { level: lvl, badge };
}

// GET /api/xp/me
router.get('/me', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  let xp = await XP.findOne({ user: userId });
  if (!xp) {
    xp = await XP.create({ user: userId });
  }
  res.json(xp);
});

// POST /api/xp/add
// Body: { amount: number }
router.post('/add', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { amount } = req.body;
  let xp = await XP.findOne({ user: userId });
  if (!xp) {
    xp = new XP({ user: userId, points: 0, level: 1 });
  }
  xp.points += amount;
  const { level } = calculateLevel(xp.points);
  xp.level = level;
  await xp.save();
  res.json(xp);
});

export default router;