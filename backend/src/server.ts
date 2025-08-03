// File: backend/src/server.ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import ritualRoutes from './routes/rituals';
import scheduleRoutes from './routes/schedules';
import xpRoutes from './routes/xp';
import journalRoutes from './routes/journal';
import { authenticateToken } from './middleware/auth';
import userRoutes from './routes/user';
import audioPromptsRouter from './routes/audioPrompts';
import path from 'path';
import chatRouter from './routes/chat';
import usersRouter from './routes/users';
import tagsRouter from './routes/tags';
import purgeRequests from './routes/purgeRequests';
import undoPurgeRouter from './routes/undoPurge';
import xpRouter from './routes/xp';
import scenicRouter from './routes/scenic';
import scenicOptionsRouter from './routes/scenicOptions';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads/audio', express.static(path.join(__dirname, '../uploads/audio')));

// Connect MongoDB
typescript
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/0wnd';
mongoose.connect(mongoUri).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth routes (no auth required)
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/rituals', authenticateToken, ritualRoutes);
app.use('/api/schedules', authenticateToken, scheduleRoutes);
app.use('/api/xp', authenticateToken, xpRoutes);
app.use('/api/journal', authenticateToken, journalRoutes);
app.use('/api/user', userRoutes)
app.use('/api/audio-prompts', audioPromptsRouter);
app.use('/api/chat', chatRouter);
app.use('/api/users', usersRouter);
app.use('/api/tags', tagsRouter);
app.use('/api/purge-requests', purgeRequests);
app.use('/api/undo-purge', undoPurgeRouter);
app.use('/api/xp', xpRouter);
app.use('/api/scenic', scenicRouter);
app.use('/api/scenic', scenicOptionsRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
