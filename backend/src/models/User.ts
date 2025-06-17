// File: backend/src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

type Role = 'Dom' | 'Sub' | 'Switch';

export interface IUser extends Document {
  username: string;
  password: string;
  role: Role;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Dom', 'Sub', 'Switch'], required: true }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);