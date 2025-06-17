import mongoose, { Schema, Document } from 'mongoose';

export type PurgeStatus = 'pending' | 'approved' | 'rejected';

export interface IPurgeRequest extends Document {
  user: mongoose.Types.ObjectId;
  status: PurgeStatus;
  createdAt: Date;
  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;
}

const PurgeRequestSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  reviewedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reviewedAt: Date
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model<IPurgeRequest>('PurgeRequest', PurgeRequestSchema);