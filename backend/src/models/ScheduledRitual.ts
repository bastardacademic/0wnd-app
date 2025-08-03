import mongoose, { Schema, Document } from 'mongoose';

type Status = 'pending' | 'completed' | 'missed';

export interface IScheduledRitual extends Document {
  template: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  scheduledTime: Date;
  status: Status;
  // proof fields...
  proofRequested: boolean;
  proofSent: boolean;
  proofApproved?: boolean;
  // outcome assignments
  outcomes: {
    onTime: string;
    late: string;
    missed: string;
  };
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
  outcomes: {
    onTime: { type: String, default: '' },
    late: { type: String, default: '' },
    missed: { type: String, default: '' },
  }
}, { timestamps: true });

export default mongoose.model<IScheduledRitual>('ScheduledRitual', ScheduledRitualSchema);
