const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');

// Get all badges
exports.getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.findAll();
    res.json(badges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

// Get user badges
exports.getUserBadges = async (req, res) => {
  try {
    const userBadges = await UserBadge.findAll({ where: { userId: req.user.userId } });
    res.json(userBadges);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user badges' });
  }
};

// Award badge to user
exports.awardBadge = async (req, res) => {
  try {
    const { userId, badgeId } = req.body;
    const userBadge = await UserBadge.create({ userId, badgeId });
    res.status(201).json(userBadge);
  } catch (error) {
    res.status(500).json({ error: 'Failed to award badge' });
  }
};
