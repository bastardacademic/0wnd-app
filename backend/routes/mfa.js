const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');

// POST /api/mfa/setup
router.post('/setup', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const secret = speakeasy.generateSecret({ length: 20, name: `0wnd (${user.username})` });
    user.mfaSecret = secret.base32;
    await user.save();

    const qr = await qrcode.toDataURL(secret.otpauth_url);
    res.json({ qr });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/mfa/verify
router.post('/verify', async (req, res) => {
  const { userId, code } = req.body;
  try {
    const user = await User.findById(userId).select('+mfaSecret');
    if (!user || !user.mfaSecret) return res.status(404).json({ error: 'User not found' });

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: code,
      window: 1,
    });

    if (!verified) return res.status(401).json({ success: false });

    user.mfaEnabled = true;
    await user.save();
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/mfa/backup-codes
router.post('/backup-codes', async (req, res) => {
  const { userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Stored plaintext for now - no real auth/session layer exists yet to protect
    // this endpoint; hash these before this is exposed behind real auth.
    const codes = Array.from({ length: 8 }, () => crypto.randomBytes(4).toString('hex'));
    user.backupCodes = codes;
    await user.save();

    res.json({ codes });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
