const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema({
    emoji: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const messageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    media: { type: String },
    isBurnOnView: { type: Boolean, default: false },
    isViewed: { type: Boolean, default: false },
    reactions: [reactionSchema],
    createdAt: { type: Date, default: Date.now }
});

messageSchema.methods.markAsViewed = function () {
    if (this.isBurnOnView) {
        this.isViewed = true;
        this.remove(); // Deletes the message after viewing if burn-on-view
    }
};

module.exports = mongoose.model('Message', messageSchema);
