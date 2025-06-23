// File: backend/src/routes/undoPurge.ts
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/auth';
import PurgeRequest from '../models/PurgeRequest';
import Journal from '../models/Journal';
import XP from '../models/XP';

const router = Router();

/**
 * POST /api/undo-purge
 * Body: { token: string }
 * Verifies JWT, restores soft-deleted data, marks request as restored
 */
router.post('/', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: 'Token required' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; requestId: string };
    const { userId, requestId } = payload;
    // Find the purge request
    const reqDoc = await PurgeRequest.findById(requestId);
    if (!reqDoc || reqDoc.user.toString() !== userId || reqDoc.status !== 'approved') {
      return res.status(400).json({ message: 'Invalid or expired undo link' });
    }
    // Restore data by unsetting deletedAt
    await Journal.updateMany({ user: userId }, { $unset: { deletedAt: "" } });
    await XP.updateMany({ user: userId }, { $unset: { deletedAt: "" } });
    // Optionally mark the request as restored
    reqDoc.status = 'rejected'; // mark as no longer purgeable
    await reqDoc.save();
    res.json({ message: 'Data restoration successful' });
  } catch (err) {
    console.error('Undo-purge error:', err);
    return res.status(400).json({ message: 'Invalid or expired token' });
  }
});

export default router;