<<<<<<< HEAD
// backend/routes/analytics.js

const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

router.get('/real-time-insights', async (req, res) => {
  try {
    const insights = await Habit.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { _id: 0, category: '$_id', count: 1 } }
    ]);
    res.json(insights);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
=======
// backend/routes/analytics.js

const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

router.get('/real-time-insights', async (req, res) => {
  try {
    const insights = await Habit.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $project: { _id: 0, category: '$_id', count: 1 } }
    ]);
    res.json(insights);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
>>>>>>> 55c2a9f (Organize files into Testing and Docs directories, implement testing, auditing, and documentation updates)
