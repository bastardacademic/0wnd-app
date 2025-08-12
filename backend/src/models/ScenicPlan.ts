import mongoose, { Schema, Document } from 'mongoose';

type PromptOption = string;

export interface IScenicPlan extends Document {
  title: string;
  owner: mongoose.Types.ObjectId;     // creator user ID
  partner: mongoose.Types.ObjectId;   // other participant
  freeText: string;
  rolePrompts: PromptOption[];        // e.g. ['Top', 'Bottom', 'Switch']
  toys: PromptOption[];
  equipment: PromptOption[];
  vibes: PromptOption[];
  createdAt: Date;
  updatedAt: Date;
}

const ScenicPlanSchema = new Schema<IScenicPlan>({
  title: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  partner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  freeText: { type: String, default: '' },
  rolePrompts: [{ type: String }],
  toys: [{ type: String }],
  equipment: [{ type: String }],
  vibes: [{ type: String }]
}, { timestamps: true });

export default mongoose.model<IScenicPlan>('ScenicPlan', ScenicPlanSchema);
