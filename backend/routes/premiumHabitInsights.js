const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');
const isPremiumUser = require('../middleware/premiumCheck');

// Premium habit insights route
router.get('/premium/habit-insights', isPremiumUser, async (req, res) => {
    try {
        const insights = await Habit.find({ userId: req.user._id });
        res.json(insights);
    } catch (err) {
        res.status(400).json('Error: ' + err);
    }
});

module.exports = router;
