import mongoose, { Schema, Document } from 'mongoose';

export interface IJournal extends Document {
  user: mongoose.Types.ObjectId;
  content: string;
  tags: string[];
  mood: number;
  createdAt: Date;
}

const JournalSchema = new Schema<IJournal>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  tags: [{ type: String }],
  mood: { type: Number, min: 1, max: 5, default: 3 }
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model<IJournal>('Journal', JournalSchema);