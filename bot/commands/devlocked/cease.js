const config = require('../../config.json');
const mongoose = require("mongoose");

module.exports.commanddata = {
    name: "cease",
    cooldown: 5,
    args: false,
    guildOnly: false,
    category: "devlocked"
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    if (message.author.id !== config.ownerID) {
        return;
    } else {
        try {
            message.channel.send("As you wish. Going offline.");
            mongoose.connection.close();
            process.kill(process.pid, 0);
        } catch (err) {
            console.log(err);
        }
    }
};