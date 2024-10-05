const mongoose = require('mongoose');

const MentorshipSchema = new mongoose.Schema({
  mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  menteeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  goals: { type: [String], required: true },
  feedback: { type: String }
});

const Mentorship = mongoose.model('Mentorship', MentorshipSchema);
module.exports = Mentorship;
