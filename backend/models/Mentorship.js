const mongoose = require('mongoose');

const mentorshipSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  startDate: { type: Date, default: Date.now },
  tasksAssigned: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  isActive: { type: Boolean, default: true },
  premiumFeature: { type: Boolean, default: true }  // Only accessible with premium
});

module.exports = mongoose.model('Mentorship', mentorshipSchema);
