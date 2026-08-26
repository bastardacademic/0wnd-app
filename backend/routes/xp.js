const express = require('express');
const router = express.Router();
const XpAward = require('../models/XpAward');

router.post('/', async (req, res) => {
  const { receiverId, giverId, amount, reason, source, sourceId } = req.body;
  if (!receiverId || !amount) return res.status(400).json({ error: 'Missing receiverId or amount' });
  try {
    await XpAward.create({ receiverId, giverId, amount, reason, source, sourceId });
    res.status(201).json({ success: true, awarded: amount });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
