const mongoose = require('mongoose');

const ritualLogSchema = new mongoose.Schema({
  ritualId:    { type: String, required: true },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  performedAt: { type: Date, default: Date.now },
  status:      { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.models.RitualLog || mongoose.model('RitualLog', ritualLogSchema);
