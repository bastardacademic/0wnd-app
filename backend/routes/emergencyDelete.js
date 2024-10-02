const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Journal = require('../models/Journal');
const Habit = require('../models/Habit');

router.delete('/emergency-delete', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);
        await Journal.deleteMany({ userId: req.user._id });
        await Habit.deleteMany({ userId: req.user._id });
        res.status(200).json({ message: 'Account and data deleted.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete data.' });
    }
});

module.exports = router;
