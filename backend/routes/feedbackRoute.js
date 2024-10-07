const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/feedback', async (req, res) => {
  const { feedback, email } = req.body;
  try {
    const newFeedback = new Feedback({ feedback, email });
    await newFeedback.save();
    res.status(200).json({ message: 'Feedback submitted successfully!' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
