const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const upload = multer();

router.post('/restore-data', upload.single('file'), async (req, res) => {
  try {
    const userData = JSON.parse(req.file.buffer.toString());
    await User.findByIdAndUpdate(req.user._id, userData);
    res.json({ message: 'Data restored successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Data restore failed' });
  }
});

module.exports = router;
