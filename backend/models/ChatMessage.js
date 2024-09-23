const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatMessageSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    viewed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
module.exports = ChatMessage;
