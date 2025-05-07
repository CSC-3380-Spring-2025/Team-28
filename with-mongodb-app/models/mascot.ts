import mongoose, { Schema, Document, models, model } from "mongoose";

interface InventoryItem {
  filename: string;
  layer: string;
}

export interface IMascot extends Document {
  userId: string;
  equipped: {
    [key: string]: string;
  };
  inventory: InventoryItem[]; //inventory being an array should fix the type error I had
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
      type: [
        {
          filename: { type: String, required: true },
          layer: { type: String, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Mascot = models.Mascot || model<IMascot>("Mascot", mascotSchema);
