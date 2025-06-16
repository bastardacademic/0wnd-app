// File: backend/src/models/Journal.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IJournal extends Document {
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  mood: string;
  tags: string[];
  content: string;
}

const JournalSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  mood: String,
  tags: [String],
  content: String
}, { timestamps: true });

export default mongoose.model<IJournal>('Journal', JournalSchema);