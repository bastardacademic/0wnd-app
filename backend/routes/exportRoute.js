const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/export-data', async (req, res) => {
  try {
    const userData = await User.findById(req.user._id);
    res.json(userData);
  } catch (err) {
    res.status(500).json({ error: 'Data export failed' });
  }
});

module.exports = router;
