import { Router } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import PurgeRequest from '../models/PurgeRequest';
import Journal from '../models/Journal';
import XP from '../models/XP';

const router = Router();
router.use(authenticateToken);

// Create a new purge request (Sub or Switch)
router.post('/', authorizeRole('Sub', 'Switch'), async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const existing = await PurgeRequest.findOne({ user: userId, status: 'pending' });
  if (existing) return res.status(400).json({ message: 'A purge request is already pending.' });
  const request = await PurgeRequest.create({ user: userId });
  res.status(201).json(request);
});

// List all pending requests (Dom or Switch)
router.get('/', authorizeRole('Dom', 'Switch'), async (_req, res) => {
  const requests = await PurgeRequest.find({ status: 'pending' }).populate('user', 'username role');
  res.json(requests);
});

// Approve a request and perform soft-delete
router.post('/:id/approve', authorizeRole('Dom', 'Switch'), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const reviewer = req.user!.id;
  const reqDoc = await PurgeRequest.findById(id);
  if (!reqDoc || reqDoc.status !== 'pending') return res.status(404).json({ message: 'Request not found or already processed.' });

  // Soft-delete user data
  await Journal.updateMany({ user: reqDoc.user }, { $set: { deletedAt: new Date() } });
  await XP.updateMany({ user: reqDoc.user }, { $set: { deletedAt: new Date() } });

  reqDoc.status = 'approved';
  reqDoc.reviewedBy = reviewer;
  reqDoc.reviewedAt = new Date();
  await reqDoc.save();

  res.json({ message: 'Purge approved and data marked for deletion.' });
});

// Reject a request
router.post('/:id/reject', authorizeRole('Dom', 'Switch'), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const reviewer = req.user!.id;
  const reqDoc = await PurgeRequest.findById(id);
  if (!reqDoc || reqDoc.status !== 'pending') return res.status(404).json({ message: 'Request not found or already processed.' });

  reqDoc.status = 'rejected';
  reqDoc.reviewedBy = reviewer;
  reqDoc.reviewedAt = new Date();
  await reqDoc.save();

  res.json({ message: 'Purge request rejected.' });
});

export default router;

// File: backend/src/server.ts (excerpt)
import purgeRequests from './routes/purgeRequests';

// ...
app.use('/api/purge-requests', purgeRequests);
