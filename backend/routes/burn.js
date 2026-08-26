const express = require('express');
const router = express.Router();

// Burn-on-view content has nothing server-side to track yet - burned state
// lives client-side in BurnableViewer. This just acknowledges the view.
router.post('/', (req, res) => {
  const { id, type } = req.body;
  if (!id || !type) return res.status(400).json({ error: 'Missing id or type' });
  res.json({ success: true });
});

module.exports = router;
