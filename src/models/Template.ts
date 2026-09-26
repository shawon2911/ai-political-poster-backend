import { Schema, model, Document } from 'mongoose';

export interface ITemplate extends Document {
  title: string; 
  occasionType: 'bijoy_dibosh' | 'shok' | 'election' | 'eid' | 'greetings';
  thumbnailUrl: string;
  layoutConfig: {
    baseBgColor: string;
    bannerText: string;
    photoCount: number;
    accentColor: string;
  };
  isActive: boolean;
}

const templateSchema = new Schema<ITemplate>(
  {
    title: { type: String, required: true },
    occasionType: {
      type: String,
      required: true,
      enum: ['bijoy_dibosh', 'shok', 'election', 'eid', 'greetings'],
    },
    thumbnailUrl: { type: String, required: true },
    layoutConfig: { type: Object, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Template = model<ITemplate>('Template', templateSchema);