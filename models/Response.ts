
import mongoose, { Document, Schema } from 'mongoose';

export interface IResponse extends Document {
  eventId: string; // Reference to the event
  formId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  dietaryRequirements?: string;
  questions?: string;
  submittedAt: Date;
}

const ResponseSchema: Schema = new Schema(
  {
    eventId: {
      type: String,
      required: [true, 'Event ID is required'],
      index: true,
    },
    formId: {
      type: String,
      required: [true, 'Form ID is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    position: {
      type: String,
      trim: true,
    },
    dietaryRequirements: {
      type: String,
      trim: true,
    },
    questions: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate submissions
ResponseSchema.index({ eventId: 1, email: 1 }, { unique: true });

export default mongoose.models.Response || mongoose.model<IResponse>('Response', ResponseSchema);