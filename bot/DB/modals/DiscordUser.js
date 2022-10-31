const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    username: { type: String, required: true },
    useravatar: { type: String, required: true},
    guilds: { type: Array, required: true}
});
const DiscordUser = module.exports = mongoose.model('User', UserSchema);