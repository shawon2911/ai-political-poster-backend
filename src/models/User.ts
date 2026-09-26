import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  emailOrPhone: string;
  passwordHash: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    emailOrPhone: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);