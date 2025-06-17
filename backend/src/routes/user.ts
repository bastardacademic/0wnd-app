import { Router } from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import Ritual from '../models/Ritual';
import Schedule from '../models/Schedule';
import Journal from '../models/Journal';
import XP from '../models/XP';
import Audit from '../models/Audit';
import stringify from 'csv-stringify';
import JSZip from 'jszip';

const router = Router();
router.use(authenticateToken);

/**
 * GET /api/user/export
 * Query params:
 *   format=csv|json|zip
 *   include=rituals,schedules,journals,xp
 */
router.get('/export', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const format = (req.query.format as string) || 'csv';
  const include = Array.isArray(req.query.include)
    ? req.query.include as string[]
    : typeof req.query.include === 'string'
    ? [req.query.include]
    : ['rituals','schedules','journals','xp'];

  // Fetch data
  const [rituals, schedules, journals, xp] = await Promise.all([
    Ritual.find({}).lean(),
    Schedule.find({}).lean(),
    Journal.find({ user: userId }).lean(),
    XP.findOne({ user: userId }).lean()
  ]);

  const sections: Record<string, any> = {
    rituals,
    schedules,
    journals,
    xp: xp || {}
  };

  // JSON export
  if (format === 'json') {
    const output: Record<string, any> = {};
    include.forEach(key => { if (sections[key] !== undefined) output[key] = sections[key]; });
    return res.json(output);
  }

  // ZIP export
  if (format === 'zip') {
    const zip = new JSZip();
    await Promise.all(include.map(key => {
      const rows = Array.isArray(sections[key]) ? sections[key] : [sections[key]];
      return new Promise<void>((resolve, reject) => {
        stringify(rows, { header: true }, (err, csv) => {
          if (err) return reject(err);
          zip.file(`${key}.csv`, csv);
          resolve();
        });
      });
    }));
    const zipData = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="0wnd-data.zip"');
    return res.send(zipData);
  }

  // CSV export (streamed)
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="0wnd-data.csv"');

  const pipeCSV = (rows: any[], columns: string[], label: string) => {
    res.write(`\n# === ${label} ===\n`);
    return new Promise<void>((resolve, reject) => {
      stringify(rows, { header: true, columns }, (err, csv) => {
        if (err) return reject(err);
        res.write(csv);
        resolve();
      });
    });
  };

  try {
    for (const key of include) {
      switch (key) {
        case 'rituals':
          await pipeCSV(rituals, ['_id','name','description','createdAt'], 'Ritual Templates');
          break;
        case 'schedules':
          await pipeCSV(schedules, ['_id','ritual','scheduledFor','status','createdAt'], 'Schedules');
          break;
        case 'journals':
          await pipeCSV(journals, ['_id','createdAt','mood','tags','content'], 'Journal Entries');
          break;
        case 'xp':
          await pipeCSV([xp||{}], ['_id','level','currentXP','nextLevelXP'], 'XP Status');
          break;
      }
    }
    // Log export action
    await Audit.create({ user: userId, action: 'EXPORT' });
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

/**
 * DELETE /api/user/purge
 * Soft-delete with audit log (24h restore window)
 */
router.delete('/purge', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  await Journal.updateMany({ user: userId }, { $set: { deletedAt: new Date() } });
  await XP.updateMany({ user: userId }, { $set: { deletedAt: new Date() } });
  await Audit.create({ user: userId, action: 'PURGE' });
  res.json({ message: 'Data marked for purge. You have 24h to restore.' });
});

/**
 * POST /api/user/restore
 * Restore soft-deleted data within 24h
 */
router.post('/restore', async (req: AuthRequest, res) => {
  const userId = req.user!.id;
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await Journal.updateMany(
    { user: userId, deletedAt: { $gte: cutoff } },
    { $unset: { deletedAt: '' } }
  );
  await XP.updateMany(
    { user: userId, deletedAt: { $gte: cutoff } },
    { $unset: { deletedAt: '' } }
  );
  await Audit.create({ user: userId, action: 'RESTORE' });
  res.json({ message: 'Data restored successfully.' });
});

export default router;
