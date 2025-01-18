const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

router.post('/habits', async (req, res) => {
    try {
        const habit = new Habit(req.body);
        await habit.save();
        res.status(201).send(habit);
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

module.exports = router;
