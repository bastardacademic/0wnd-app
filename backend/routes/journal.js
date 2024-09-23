const router = require('express').Router();
const JournalEntry = require('../models/JournalEntry');
const auth = require('../middleware/auth');

// Create a journal entry
router.post('/create', auth, (req, res) => {
    const newEntry = new JournalEntry({
        userId: req.user.id,
        content: req.body.content,
        category: req.body.category
    });
    newEntry.save()
        .then(() => res.json('Journal entry created!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Get all journal entries
router.get('/all', auth, (req, res) => {
    JournalEntry.find({ userId: req.user.id })
        .then(entries => res.json(entries))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
