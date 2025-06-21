import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  createdAt: Date;
}

const TagSchema = new Schema<ITag>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
}, { timestamps: { createdAt: true, updatedAt: false } });

export default mongoose.model<ITag>('Tag', TagSchema);