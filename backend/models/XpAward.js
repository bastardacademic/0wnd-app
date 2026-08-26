const mongoose = require('mongoose');

const xpAwardSchema = new mongoose.Schema({
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  giverId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount:     { type: Number, required: true },
  reason:     String,
  source:     String,
  sourceId:   String,
}, { timestamps: true });

module.exports = mongoose.models.XpAward || mongoose.model('XpAward', xpAwardSchema);
