const mongoose = require('mongoose');

const PersonalCardSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    color: { type: String, required: true }
});
const PersonalCard = module.exports = mongoose.model('PersonalCard', PersonalCardSchema);