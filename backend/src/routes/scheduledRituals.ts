import { Router } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import ScheduledRitual from '../models/ScheduledRitual';

const router = Router();
router.use(authenticateToken);

// Existing routes: GET, POST, DELETE, etc.

// PUT /api/scheduled-rituals/:id
// Body: { scheduledTime: Date }
router.put('/:id', authorizeRole('Dom', 'Switch'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    const { scheduledTime } = req.body;
    const ritual = await ScheduledRitual.findById(id);
    if (!ritual) return res.status(404).json({ message: 'Scheduled ritual not found' });
    // Optional: check ownership or template permission
    ritual.scheduledTime = new Date(scheduledTime);
    ritual.status = 'pending'; // reset status
    await ritual.save();
    res.json(ritual);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to reschedule ritual' });
  }
});

export default router;