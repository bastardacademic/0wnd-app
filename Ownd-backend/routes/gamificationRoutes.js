const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const rbacMiddleware = require('../middleware/rbacMiddleware');
const gamificationController = require('../controllers/gamificationController');

// Routes for gamification
router.get('/badges', authMiddleware, gamificationController.getAllBadges);
router.get('/user-badges', authMiddleware, gamificationController.getUserBadges);
router.post('/award-badge', authMiddleware, rbacMiddleware(['D']), gamificationController.awardBadge);

module.exports = router;
