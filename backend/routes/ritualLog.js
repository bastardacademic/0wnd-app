const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RitualLog = require('../models/RitualLog');
const XpAward = require('../models/XpAward');

// POST /api/ritual-log
router.post('/', async (req, res) => {
  const { ritualId, userId, performedAt, status } = req.body;
  if (!ritualId || !userId || !status) return res.status(400).json({ error: 'Missing fields' });
  try {
    const log = await RitualLog.create({ ritualId, userId, performedAt, status });

    // Award XP if the ritual template has schedule-based XP config - the
    // RitualTemplate model is registered by routes/rituals.js at startup.
    const RitualTemplate = mongoose.models.RitualTemplate;
    if (RitualTemplate) {
      const template = await RitualTemplate.findById(ritualId).catch(() => null);
      const amount = status === 'overdue' ? template?.xpLate : template?.xpOnTime;
      if (template && amount) {
        await XpAward.create({
          receiverId: userId,
          amount,
          reason: `Ritual ${status === 'overdue' ? 'completed late' : 'completed on time'}`,
          source: 'ritual',
          sourceId: ritualId,
        });
      }
    }

    res.status(201).json(log);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
