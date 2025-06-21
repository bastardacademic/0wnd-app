// File: backend/src/models/ChatMessage.ts
import mongoose, { Schema, Document } from 'mongoose';

type Role = 'Dom' | 'Sub' | 'Switch';

export interface IChatMessage extends Document {
  sender: mongoose.Types.ObjectId;
  recipient: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
  burnOnView: boolean;
  viewedAt?: Date;
}

const ChatMessageSchema = new Schema<IChatMessage>(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    recipient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    burnOnView: { type: Boolean, default: false },
    viewedAt: { type: Date }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IChatMessage>('ChatMessage', ChatMessageSchema);
