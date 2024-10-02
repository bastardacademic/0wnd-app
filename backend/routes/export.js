const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Journal = require('../models/Journal');
const Habit = require('../models/Habit');

// Export user data
router.get('/export', async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const journals = await Journal.find({ userId: req.user._id });
        const habits = await Habit.find({ userId: req.user._id });

        const exportData = { user, journals, habits };

        res.json(exportData);
    } catch (err) {
        res.status(500).json({ error: 'Failed to export data' });
    }
});

module.exports = router;
