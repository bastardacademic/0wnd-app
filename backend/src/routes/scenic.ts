import { Router } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import ScenicPlan from '../models/ScenicPlan';

const router = Router();
router.use(authenticateToken);

// GET all plans for user
router.get('/', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const plans = await ScenicPlan.find({ $or: [{ owner: userId }, { partner: userId }] }).populate('partner', 'username');
  res.json(plans);
});

// POST create new plan
router.post('/', authorizeRole('Dom','Sub','Switch'), async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const { title, partnerId, freeText, rolePrompts, toys, equipment, vibes } = req.body;
  const plan = await ScenicPlan.create({
    title,
    owner: userId,
    partner: partnerId,
    freeText,
    rolePrompts,
    toys,
    equipment,
    vibes
  });
  res.status(201).json(plan);
});

// PUT update existing plan
router.put('/:id', authorizeRole('Dom','Sub','Switch'), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const plan = await ScenicPlan.findById(id);
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  if (![plan.owner.toString(), plan.partner.toString()].includes(req.user!.id)) return res.sendStatus(403);
  Object.assign(plan, req.body);
  await plan.save();
  res.json(plan);
});

// DELETE
router.delete('/:id', authorizeRole('Dom','Sub','Switch'), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const plan = await ScenicPlan.findById(id);
  if (!plan) return res.status(404).json({ message: 'Plan not found' });
  if (![plan.owner.toString(), plan.partner.toString()].includes(req.user!.id)) return res.sendStatus(403);
  await plan.remove();
  res.json({ message: 'Deleted' });
});

export default router;
