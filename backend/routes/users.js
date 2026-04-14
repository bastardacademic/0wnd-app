const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'Missing fields' });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, role: role || 'sub' });
    res.status(201).json({ id: user._id, username: user.username, role: user.role });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Search users
router.get('/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query required' });
  try {
    const users = await User.find(
      { username: { $regex: q, $options: 'i' } },
      '_id username role'
    ).limit(10);
    res.json(users);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// Get subs for a dom
router.get('/subs', async (req, res) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return res.status(400).json({ error: 'Missing user id' });
  try {
    const Partnership = require('../models/Partnership');
    const partnerships = await Partnership.find({
      $or: [{ initiator: userId }, { recipient: userId }],
      status: 'accepted'
    }).populate('initiator', 'username role').populate('recipient', 'username role');
    const subs = partnerships
      .map(p => {
        const isInitiator = p.initiator._id.toString() === userId;
        const myRole = isInitiator ? p.initiatorRole : (p.initiatorRole === 'dom' ? 'sub' : 'dom');
        const partner = isInitiator ? p.recipient : p.initiator;
        return myRole === 'dom' ? { id: partner._id, displayName: partner.username } : null;
      })
      .filter(Boolean);
    res.json(subs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;