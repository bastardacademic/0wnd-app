import mongoose, { Schema, Document } from 'mongoose';

type Status = 'pending' | 'completed' | 'missed';

export interface IScheduledRitual extends Document {
  template: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  scheduledTime: Date;
  status: Status;
  proofRequested: boolean;         // Dom requests proof
  proofSent: boolean;             // Sub has sent proof
  proofApproved?: boolean;        // Dom approves proof
  outcomeReward?: string;         // outcome: reward or punishment instructions
  createdAt: Date;
  updatedAt: Date;
}

const ScheduledRitualSchema = new Schema<IScheduledRitual>({
  template: { type: Schema.Types.ObjectId, ref: 'Ritual', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledTime: { type: Date, required: true },
  status: { type: String, enum: ['pending','completed','missed'], default: 'pending' },
  proofRequested: { type: Boolean, default: false },
  proofSent: { type: Boolean, default: false },
  proofApproved: { type: Boolean },
  outcomeReward: { type: String }
}, { timestamps: true });

export default mongoose.model<IScheduledRitual>('ScheduledRitual', ScheduledRitualSchema);
