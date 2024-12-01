const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/send-burn-on-view', async (req, res) => {
  try {
    const newMessage = new Message({
      senderId: req.body.senderId,
      receiverId: req.body.receiverId,
      content: req.body.content,
      isBurnOnView: true,
    });
    await newMessage.save();
    res.status(201).json({ message: 'Burn-on-view message sent successfully!' });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
