const express = require('express');
const router = express.Router();
const XpAward = require('../models/XpAward');

async function respondWithTotal(userId, res) {
  if (!userId) return res.status(400).json({ error: 'Missing user id' });
  try {
    const [result] = await XpAward.aggregate([
      { $match: { receiverId: new (require('mongoose').Types.ObjectId)(userId) } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const total = result?.total ?? 0;
    res.json({ total, xp: total, level: `Level ${Math.floor(total / 100)}` });
  } catch (err) { res.status(500).json({ error: err.message }); }
}

// Used by DevotionMeter when given a userId prop (x-user-id header)
router.get('/', (req, res) => respondWithTotal(req.headers['x-user-id'], res));

// Used by SubDashboard's own devotion fetch (path param)
router.get('/:id', (req, res) => respondWithTotal(req.params.id, res));

module.exports = router;
