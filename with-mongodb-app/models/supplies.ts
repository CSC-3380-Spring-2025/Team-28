import mongoose from "mongoose";

const suppliesSchema = new mongoose.Schema({
  supplieID: { type: Array },
  email: { type: String, required: true, unique: true },
  suppliesTable: [
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
    { type: Array },
  ],
});

const Supplies =
  mongoose.models.User || mongoose.model("Supplies", suppliesSchema);
export default Supplies;
