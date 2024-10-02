const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Generate insights for habits
router.get('/insights', async (req, res) => {
    try {
        const insights = await Habit.aggregate([
            { \: { userId: req.user._id } },
            { \: { _id: \, count: { \: 1 } } },
            { \: { _id: 0, category: \, count: 1 } }
        ]);
        res.json(insights);
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate insights' });
    }
});

module.exports = router;
