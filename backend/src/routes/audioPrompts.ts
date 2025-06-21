// File: backend/src/routes/audioPrompts.ts
import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken, authorizeRole, AuthRequest } from '../middleware/auth';
import AudioPrompt from '../models/AudioPrompt';

const router = Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads/audio')); // ensure folder exists
  },
  filename: (req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random()*1e6)}${path.extname(file.originalname)}`;
    cb(null, unique);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('audio/')) {
      return cb(new Error('Only audio files are allowed'));
    }
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max
});

// Ensure directory served statically in server.ts

// Protect all endpoints
router.use(authenticateToken);

/**
 * POST /api/audio-prompts
 * Upload an audio file and create AudioPrompt
 * Body: multipart/form-data with 'file' and 'ritualId'
 */
router.post(
  '/',
  authorizeRole('Dom', 'Switch'),
  upload.single('file'),
  async (req: AuthRequest, res) => {
    try {
      const { ritualId } = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const url = `/uploads/audio/${req.file.filename}`;
      const prompt = await AudioPrompt.create({
        ritual: ritualId,
        url,
        filename: req.file.filename
      });
      res.status(201).json(prompt);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Upload failed' });
    }
  }
);

/**
 * GET /api/rituals/:ritualId/audio-prompts
 * List audio prompts for a ritual
 */
router.get(
  '/rituals/:ritualId',
  authorizeRole('Dom', 'Sub', 'Switch'),
  async (req, res) => {
    try {
      const { ritualId } = req.params;
      const prompts = await AudioPrompt.find({ ritual: ritualId }).sort({ createdAt: 1 });
      res.json(prompts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to fetch audio prompts' });
    }
  }
);

export default router;