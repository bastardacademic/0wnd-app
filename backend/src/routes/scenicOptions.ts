import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { scenicPrompts } from '../config/scenicPrompts';

const router = Router();
router.use(authenticateToken);

// GET /api/scenic/options
router.get('/options', (_req, res) => {
  res.json(scenicPrompts);
});

export default router;
