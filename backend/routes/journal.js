const express = require('express');
const router = express.Router();
const JournalEntry = require('../models/JournalEntry');
const Partnership = require('../models/Partnership');

// Create a journal entry
router.post('/', async (req, res) => {
  const { userId, title, mood, body, text, media } = req.body;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  try {
    const entry = await JournalEntry.create({
      userId, title, mood, media,
      body: body ?? text ?? '',
    });
    res.status(201).json({ ...entry.toObject(), id: entry._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get the current user's own journal entries (used by mood/frequency/tag charts)
router.get('/', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(400).json({ error: 'Missing user id' });
  try {
    const entries = await JournalEntry.find({ userId }).sort({ createdAt: 1 });
    res.json(entries);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get all journal entries written by a dom's subs
router.get('/subs', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(400).json({ error: 'Missing user id' });
  try {
    const partnerships = await Partnership.find({
      $or: [{ initiator: userId }, { recipient: userId }],
      status: 'accepted'
    }).populate('initiator', 'username').populate('recipient', 'username');

    const subIds = partnerships
      .map(p => (p.initiator._id.toString() === userId ? p.recipient : p.initiator))
      .filter(Boolean);
    const subNames = Object.fromEntries(subIds.map(s => [s._id.toString(), s.username]));

    const entries = await JournalEntry.find({ userId: { $in: subIds.map(s => s._id) } })
      .sort({ createdAt: -1 });

    res.json(entries.map(e => ({
      id: e._id,
      userId: e.userId,
      subName: subNames[e.userId.toString()],
      title: e.title,
      mood: e.mood,
      body: e.body,
      media: e.media,
      createdAt: e.createdAt,
    })));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
