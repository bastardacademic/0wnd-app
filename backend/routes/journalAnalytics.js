const router = require('express').Router();
const JournalEntry = require('../models/JournalEntry');

// Ensure GDPR compliance by anonymizing journal data
router.get('/analytics', (req, res) => {
    JournalEntry.aggregate([
        { $match: { userId: req.user._id } },  // Ensure only user-specific data is used
        { $group: { _id: { $month: '$createdAt' }, count: { $sum: 1 } } },  // Group by month of creation
        { $project: { _id: 0, month: '$_id', count: 1 } }  // Remove sensitive identifiers and only keep counts
    ])
    .then(result => res.json(result))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
