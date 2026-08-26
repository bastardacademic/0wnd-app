const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ritualTemplateSchema = new mongoose.Schema({
  name: String,
  description: String,
  rewards: Object,
  userId: String,
  assignedTo: String,
  status: { type: String, default: 'active' },
  repeat: String,
  time: String,
  duration: Number,
  xpOnTime: Number,
  xpLate: Number,
  xpMissed: Number,
}, { timestamps: true });

const RitualTemplate = mongoose.models.RitualTemplate ||
  mongoose.model('RitualTemplate', ritualTemplateSchema);

// Create template
router.post('/templates', async (req, res) => {
  try {
    const ritual = await RitualTemplate.create(req.body);
    res.status(201).json(ritual);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get templates
router.get('/templates', async (req, res) => {
  const userId = req.headers['x-user-id'];
  try {
    const rituals = await RitualTemplate.find(userId ? { userId } : {});
    res.json(rituals);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get rituals created by dom
router.get('/created', async (req, res) => {
  const userId = req.headers['x-user-id'];
  try {
    const rituals = await RitualTemplate.find({ userId });
    res.json(rituals);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get rituals assigned to sub
router.get('/assigned', async (req, res) => {
  const userId = req.headers['x-user-id'];
  try {
    const rituals = await RitualTemplate.find({ assignedTo: userId });
    res.json(rituals);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Update ritual status
router.patch('/:id', async (req, res) => {
  try {
    const ritual = await RitualTemplate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ritual) return res.status(404).json({ error: 'Not found' });
    res.json(ritual);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;