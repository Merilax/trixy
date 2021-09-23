const mongoose = require('mongoose');

const GuildCardSchema = new mongoose.Schema({
    discordId: { type: String, required: true },
    color: { type: String, required: true }
});
const GuildCard = module.exports = mongoose.model('GuildCard', GuildCardSchema);