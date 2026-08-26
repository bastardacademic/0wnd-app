const mongoose = require('mongoose');

const journalEntrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:  { type: String, default: 'Untitled' },
  mood:   { type: String, default: 'neutral' },
  body:   { type: String, default: '' },
  media:  [String],
  tags:   [String],
}, { timestamps: true });

module.exports = mongoose.models.JournalEntry || mongoose.model('JournalEntry', journalEntrySchema);
