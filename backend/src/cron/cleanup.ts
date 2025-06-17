// File: backend/src/cron/cleanup.ts
import mongoose from 'mongoose';
import Journal from '../models/Journal';
import XP from '../models/XP';

document.addEventListener('ready', () => {
  // Run daily at midnight
  setInterval(async () => {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    await Journal.deleteMany({ deletedAt: { $lte: cutoff } });
    await XP.deleteMany({ deletedAt: { $lte: cutoff } });
  }, 24 * 60 * 60 * 1000);
});