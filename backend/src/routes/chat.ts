// File: backend/src/routes/chat.ts
import { Router } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import ChatMessage from '../models/ChatMessage';
import User from '../models/User';

const router = Router();
router.use(authenticateToken);

// GET /api/chat/:userId - get messages between req.user and userId
router.get('/:userId', authorizeRole('Dom','Sub','Switch'), async (req: AuthRequest, res) => {
  const me = req.user!.id;
  const other = req.params.userId;
  const messages = await ChatMessage.find({
    $or: [
      { sender: me, recipient: other },
      { sender: other, recipient: me }
    ]
  }).sort('createdAt').populate('sender', 'username role');
  res.json(messages);
});

// POST /api/chat - send a message
router.post('/', authorizeRole('Dom','Sub','Switch'), async (req: AuthRequest, res) => {
  const { recipientId, content, burnOnView } = req.body;
  const msg = await ChatMessage.create({
    sender: req.user!.id,
    recipient: recipientId,
    content,
    burnOnView: Boolean(burnOnView)
  });
  res.status(201).json(msg);
});

// POST /api/chat/:id/view - mark message viewed; delete if burnOnView
router.post('/:id/view', authorizeRole('Dom','Sub','Switch'), async (req: AuthRequest, res) => {
  const msg = await ChatMessage.findById(req.params.id);
  if (!msg) return res.status(404).json({ message: 'Message not found' });
  // Only recipient can view
  if (msg.recipient.toString() !== req.user!.id) return res.sendStatus(403);
  msg.viewedAt = new Date();
  await msg.save();
  if (msg.burnOnView) {
    await msg.remove();
  }
  res.json({ message: 'Message marked viewed' });
});

export default router;