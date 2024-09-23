const schedule = require('node-schedule');
const router = require('express').Router();
const NotificationService = require('../services/NotificationService');
function scheduleHabitReminder(habit) {
    const reminderDate = calculateNextReminder(habit.frequency);
    schedule.scheduleJob(reminderDate, () => {
        NotificationService.sendReminder(habit.userId, \Reminder: \\);
    });
}
module.exports = router;
