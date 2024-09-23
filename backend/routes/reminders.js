const router = require('express').Router();
const schedule = require('node-schedule');
const Habit = require('../models/Habit');
const NotificationService = require('../services/NotificationService');

function scheduleHabitReminder(habit) {
    const reminderDate = new Date(habit.nextDue);
    schedule.scheduleJob(reminderDate, () => {
        NotificationService.sendReminder(habit.userId, Reminder: \);
    });
}

router.post('/reminders/schedule', (req, res) => {
    const { habitId } = req.body;

    Habit.findById(habitId)
        .then(habit => {
            scheduleHabitReminder(habit);
            res.json({ message: 'Reminder scheduled successfully!' });
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
