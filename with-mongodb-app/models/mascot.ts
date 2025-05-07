import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IMascot extends Document {
  userId: string;
  equipped: {
    [key: string]: string;
  };
  inventory: string[];
}

const mascotSchema = new Schema<IMascot>(
  {
    userId: {
      type: String,
      required: true,
    },
    equipped: {
      type: Map,
      of: String,
      default: {},
    },
    inventory: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Mascot = models.Mascot || model<IMascot>("Mascot", mascotSchema);
