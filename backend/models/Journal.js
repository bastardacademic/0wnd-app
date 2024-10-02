const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    category: { type: String, enum: ['Private', 'Public', 'Shared', 'Erotica'] },
    sharedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Journal', journalSchema);
