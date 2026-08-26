const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['dom', 'sub', 'switch'], default: 'sub' },
  partners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Partnership' }],
  mfaEnabled: { type: Boolean, default: false },
  mfaSecret:  { type: String, select: false },
  backupCodes: [String]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
