const mongoose = require('mongoose');

const ReminderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true, maxLenght: 1999},
    duration: { type: Number, required: true}
});
const Reminders = module.exports = mongoose.model('Reminder', ReminderSchema);