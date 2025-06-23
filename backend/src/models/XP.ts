// File: backend/src/models/XP.ts
import mongoose, { Schema, Document } from 'mongoose';

type LevelDefinition = {
  threshold: number;  // XP required to reach this level
  badge: string;      // Badge name or icon identifier
};

export interface IXP extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
}

const XP_SCHEMA = new Schema<IXP>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 }
}, { timestamps: true });

export default mongoose.model<IXP>('XP', XP_SCHEMA);