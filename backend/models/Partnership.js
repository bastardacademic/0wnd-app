const mongoose = require('mongoose');

const partnershipSchema = new mongoose.Schema({
  initiator:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  initiatorRole:   { type: String, enum: ['dom', 'sub'], required: true },
  status:          { type: String, enum: ['pending', 'accepted', 'rejected', 'dissolved'], default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Partnership', partnershipSchema);
