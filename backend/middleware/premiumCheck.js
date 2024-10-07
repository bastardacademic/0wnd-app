function isPremiumUser(req, res, next) {
    if (req.user && req.user.isPremium) {
        return next();
    } else {
        return res.status(403).json({ message: 'Premium subscription required to access this feature' });
    }
}
module.exports = isPremiumUser;
