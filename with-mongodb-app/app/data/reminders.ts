import express from 'express';
import Reminder from '../Reminder';

const router = express.Router();

// GET all reminders
router.get('/', async (_req, res) => {
  const reminders = await Reminder.find().sort({ date: 1 });
  res.json(reminders);
});

// POST new reminder
router.post('/', async (req, res) => {
  const { title, date } = req.body;
  const reminder = new Reminder({ title, date });
  await reminder.save();
  res.status(201).json(reminder);
});

// DELETE reminder
router.delete('/:id', async (req, res) => {
  await Reminder.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

export default router;
