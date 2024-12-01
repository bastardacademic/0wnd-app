const express = require('express');
const router = express.Router();
const GroupChallenge = require('../models/GroupChallenge');

router.post('/create-challenge', async (req, res) => {
  try {
    const challenge = new GroupChallenge({
      title: req.body.title,
      description: req.body.description,
      members: req.body.members,
    });
    await challenge.save();
    res.status(201).json({ message: 'Challenge created successfully!' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
