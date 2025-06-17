// File: backend/src/models/Audit.ts
import mongoose, { Schema, Document } from 'mongoose';

type Action = 'EXPORT' | 'PURGE' | 'RESTORE';
export interface IAudit extends Document {
  user: mongoose.Types.ObjectId;
  action: Action;
  timestamp: Date;
  details?: Record<string, any>;
}
const AuditSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['EXPORT','PURGE','RESTORE'], required: true },
  timestamp: { type: Date, default: Date.now },
  details: Schema.Types.Mixed
});
export default mongoose.model<IAudit>('Audit', AuditSchema);