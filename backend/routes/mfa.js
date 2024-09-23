const router = require('express').Router();
router.post('/enable-mfa', (req, res) => {
    if (!req.user.isPremium) {
        return res.status(403).json({ message: 'Multi-factor authentication is a premium feature.' });
    }
    // MFA logic
});
module.exports = router;
