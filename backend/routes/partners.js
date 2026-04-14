const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Partnership = require('../models/Partnership');

// Search users by username
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query required' });
  try {
    const users = await User.find(
      { username: { $regex: q, $options: 'i' } },
      '_id username role'
    ).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send link request
router.post('/request', async (req, res) => {
  const { initiatorId, recipientId, initiatorRole } = req.body;
  if (!initiatorId || !recipientId || !initiatorRole)
    return res.status(400).json({ error: 'Missing fields' });
  try {
    const existing = await Partnership.findOne({
      $or: [
        { initiator: initiatorId, recipient: recipientId },
        { initiator: recipientId, recipient: initiatorId },
      ],
      status: { $in: ['pending', 'accepted'] }
    });
    if (existing) return res.status(409).json({ error: 'Partnership already exists or pending' });

    const partnership = await Partnership.create({ initiator: initiatorId, recipient: recipientId, initiatorRole });
    res.status(201).json(partnership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all partnerships for a user
router.get('/:userId', async (req, res) => {
  try {
    const partnerships = await Partnership.find({
      $or: [{ initiator: req.params.userId }, { recipient: req.params.userId }]
    })
    .populate('initiator', 'username')
    .populate('recipient', 'username');
    res.json(partnerships);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Accept or reject
router.patch('/:partnershipId', async (req, res) => {
  const { status } = req.body;
  if (!['accepted', 'rejected', 'dissolved'].includes(status))
    return res.status(400).json({ error: 'Invalid status' });
  try {
    const partnership = await Partnership.findByIdAndUpdate(
      req.params.partnershipId,
      { status },
      { new: true }
    );
    if (!partnership) return res.status(404).json({ error: 'Not found' });
    res.json(partnership);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
