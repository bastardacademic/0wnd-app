// File: backend/src/models/Schedule.ts
import mongoose, { Schema, Document } from 'mongoose';

type Status = 'pending' | 'completed' | 'missed';

export interface ISchedule extends Document {
  ritual: mongoose.Types.ObjectId;
  scheduledFor: Date;
  status: Status;
}

const ScheduleSchema: Schema = new Schema({
  ritual: { type: Schema.Types.ObjectId, ref: 'Ritual', required: true },
  scheduledFor: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'missed'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model<ISchedule>('Schedule', ScheduleSchema);