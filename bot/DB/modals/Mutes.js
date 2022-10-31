const mongoose = require('mongoose');

const MuteSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    guildId: { type: String, required: true},
    duration: { type: Number, required: true}
});
const Mutes = module.exports = mongoose.model('Reminder', MuteSchema);