const router = require('express').Router();
const Reward = require('../models/Reward');
router.post('/award', async (req, res) => {
    const { userId, rewardType } = req.body;
    if (!req.user.isPremium) {
        return res.status(403).json({ message: 'This feature is only available for premium users.' });
    }
    const newReward = new Reward({ userId, rewardType, points: 10 });
    await newReward.save();
    res.json({ message: 'Reward awarded!' });
});
module.exports = router;
