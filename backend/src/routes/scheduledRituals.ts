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

// Sub marks proof sent
router.post('/:id/proof-sent', authenticateToken, authorizeRole('Sub'), async (req: AuthRequest, res) => {
  const ritual = await ScheduledRitual.findById(req.params.id);
  if (!ritual) return res.status(404).json({ message: 'Not found' });
  if (ritual.user.toString() !== req.user!.id) return res.sendStatus(403);
  if (ritual.status !== 'completed') return res.status(400).json({ message: 'Ritual not completed' });
  ritual.proofSent = true;
  ritual.proofRequested = false;
  await ritual.save();
  res.json(ritual);
});

// Dom requests proof (optional) or automatically when marking completed
router.post('/:id/request-proof', authenticateToken, authorizeRole('Dom','Switch'), async (req: AuthRequest, res) => {
  const ritual = await ScheduledRitual.findById(req.params.id);
  if (!ritual) return res.status(404).json({ message: 'Not found' });
  ritual.proofRequested = true;
  await ritual.save();
  res.json(ritual);
});

// Dom approves proof and assigns reward/punishment
router.post('/:id/proof-approve', authenticateToken, authorizeRole('Dom','Switch'), async (req: AuthRequest, res) => {
  const ritual = await ScheduledRitual.findById(req.params.id).populate('template');
  if (!ritual) return res.status(404).json({ message: 'Not found' });
  if (!ritual.proofSent) return res.status(400).json({ message: 'Proof not sent' });
  ritual.proofApproved = true;
  // Assign outcomeReward based on ritual.template.outcomes
  // Assume ritual.template.outcomes.onTime.reward etc.
  const template: any = ritual.template;
  const reward = template.outcomes?.onTime?.reward || 'No reward configured';
  ritual.outcomeReward = reward;
  await ritual.save();
  res.json({ ritual, reward });
});

// Sub can fetch assigned reward/punishment
// GET /api/scheduled-rituals/:id/outcome
router.get('/:id/outcome', authenticateToken, async (req: AuthRequest, res) => {
  const ritual = await ScheduledRitual.findById(req.params.id);
  if (!ritual) return res.status(404).json({ message: 'Not found' });
  if (ritual.user.toString() !== req.user!.id && (['Dom','Switch'].includes(req.user!.role!) ) === false)
    return res.sendStatus(403);
  res.json({ proofApproved: ritual.proofApproved, outcomeReward: ritual.outcomeReward });
});

export default router;
