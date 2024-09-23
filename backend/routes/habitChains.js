const router = require('express').Router();
const HabitChain = require('../models/HabitChain');

router.post('/create', (req, res) => {
    if (!req.user.isPremium) {
        return res.status(403).json({ message: 'This feature is only available for premium users.' });
    }
    const newChain = new HabitChain({
        userId: req.user.id,
        chainName: req.body.chainName,
        habits: req.body.habits
    });
    newChain.save()
        .then(() => res.json('Habit chain created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
