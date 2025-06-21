// File: backend/src/models/AudioPrompt.ts
import mongoose, { Schema, Document } from 'mongoose';

type AudioPromptDoc = Document & {
  ritual: mongoose.Types.ObjectId;
  url: string;
  filename: string;
  createdAt: Date;
};

const AudioPromptSchema = new Schema<AudioPromptDoc>(
  {
    ritual: { type: Schema.Types.ObjectId, ref: 'Ritual', required: true },
    url: { type: String, required: true },
    filename: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<AudioPromptDoc>('AudioPrompt', AudioPromptSchema);