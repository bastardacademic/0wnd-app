const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

// Get all habits for a user
router.get('/', async (req, res) => {
    try {
        const habits = await Habit.find({ userId: req.user._id });
        res.json(habits);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create a new habit
router.post('/', async (req, res) => {
    try {
        const newHabit = new Habit({
            userId: req.user._id,
            title: req.body.title,
            frequency: req.body.frequency,
            status: 'active'
        });
        const savedHabit = await newHabit.save();
        res.status(201).json(savedHabit);
    } catch (err) {
        res.status(400).json({ error: 'Error creating habit' });
    }
});

module.exports = router;
