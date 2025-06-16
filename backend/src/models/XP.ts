// File: backend/src/models/XP.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IXP extends Document {
  user: mongoose.Types.ObjectId;
  level: number;
  currentXP: number;
  nextLevelXP: number;
}

const XPSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  level: { type: Number, default: 1 },
  currentXP: { type: Number, default: 0 },
  nextLevelXP: { type: Number, default: 100 }
}, { timestamps: true });

export default mongoose.model<IXP>('XP', XPSchema);