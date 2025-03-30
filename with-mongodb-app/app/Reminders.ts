import mongoose from 'mongoose';

const ReminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Reminder', ReminderSchema);
