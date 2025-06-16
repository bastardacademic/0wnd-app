// File: backend/src/models/Ritual.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IRitual extends Document {
  name: string;
  description?: string;
  outcomes: {
    onTime: Record<string, any>;
    late: Record<string, any>;
    missed: Record<string, any>;
  };
}

const RitualSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: String,
  outcomes: {
    onTime: { type: Schema.Types.Mixed, default: {} },
    late: { type: Schema.Types.Mixed, default: {} },
    missed: { type: Schema.Types.Mixed, default: {} },
  }
}, { timestamps: true });

export default mongoose.model<IRitual>('Ritual', RitualSchema);