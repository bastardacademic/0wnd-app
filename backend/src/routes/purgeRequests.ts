import { Router } from 'express';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import PurgeRequest from '../models/PurgeRequest';
import Journal from '../models/Journal';
import XP from '../models/XP';
import User from '../models/User';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

const router = Router();
router.use(authenticateToken);

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Create a new purge request (Sub or Switch)
 */
router.post('/', authorizeRole('Sub', 'Switch'), async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const existing = await PurgeRequest.findOne({ user: userId, status: 'pending' });
  if (existing) return res.status(400).json({ message: 'A purge request is already pending.' });
  const request = await PurgeRequest.create({ user: userId });
  res.status(201).json(request);
});

/**
 * List all pending requests (Dom or Switch)
 */
router.get('/', authorizeRole('Dom', 'Switch'), async (_req, res) => {
  const requests = await PurgeRequest.find({ status: 'pending' }).populate('user', 'username email role');
  res.json(requests);
});

/**
 * Approve a request and perform soft-delete, then send approval email
 */
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

  // Send approval email with undo link
  try {
    const user = await User.findById(reqDoc.user);
    if (user && user.email) {
      const token = jwt.sign(
        { userId: reqDoc.user, requestId: reqDoc.id },
        process.env.JWT_SECRET!,
        { expiresIn: '24h' }
      );
      const undoUrl = `${process.env.FRONTEND_URL}/undo-purge?token=${token}`;
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Your data purge request was approved',
        html: `
          <p>Hello ${user.username},</p>
          <p>Your data purge request has been <strong>approved</strong>.</p>
          <p>If this was a mistake, you can restore your data within 24 hours by <a href="${undoUrl}">clicking here</a>.</p>
          <p>— The 0wnd Team</p>
        `,
      });
    }
  } catch (err) {
    console.error('Approval email error:', err);
  }

  res.json({ message: 'Purge approved and data marked for deletion.' });
});

/**
 * Reject a request and send rejection email
 */
router.post('/:id/reject', authorizeRole('Dom', 'Switch'), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const reviewer = req.user!.id;
  const reqDoc = await PurgeRequest.findById(id);
  if (!reqDoc || reqDoc.status !== 'pending') return res.status(404).json({ message: 'Request not found or already processed.' });

  reqDoc.status = 'rejected';
  reqDoc.reviewedBy = reviewer;
  reqDoc.reviewedAt = new Date();
  await reqDoc.save();

  // Send rejection email
  try {
    const user = await User.findById(reqDoc.user);
    if (user && user.email) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: 'Your data purge request was rejected',
        html: `
          <p>Hello ${user.username},</p>
          <p>Your data purge request has been <strong>rejected</strong>. No data was deleted.</p>
          <p>— The 0wnd Team</p>
        `,
      });
    }
  } catch (err) {
    console.error('Rejection email error:', err);
  }

  res.json({ message: 'Purge request rejected.' });
});

export default router;
