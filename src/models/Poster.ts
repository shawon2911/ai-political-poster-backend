import { Schema, model, Document, Types } from 'mongoose';

export interface IPoster extends Document {
  userId: Types.ObjectId;
  templateId: Types.ObjectId;
  formData: {
    name: string;
    designation: string;
    partyName: string;
    location: string; 
    headlineText: string; 
  };
  uploadedPhotoUrls: string[];
  generatedImageUrl?: string;
  status: 'pending' | 'generating' | 'completed' | 'failed';
}

const posterSchema = new Schema<IPoster>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    templateId: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
    formData: {
      name: { type: String, required: true },
      designation: { type: String, required: true },
      partyName: { type: String, required: true },
      location: { type: String, required: true },
      headlineText: { type: String, required: true },
    },
    uploadedPhotoUrls: [{ type: String }],
    generatedImageUrl: { type: String },
    status: {
      type: String,
      enum: ['pending', 'generating', 'completed', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Poster = model<IPoster>('Poster', posterSchema);