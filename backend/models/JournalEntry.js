const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalEntrySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Public', 'Private', 'Shared', 'Erotica'], default: 'Private' },
    createdAt: { type: Date, default: Date.now }
});

const JournalEntry = mongoose.model('JournalEntry', JournalEntrySchema);
module.exports = JournalEntry;
