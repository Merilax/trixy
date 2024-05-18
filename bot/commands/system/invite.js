const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "invite",
    category: "system",
    cooldown: 2,
    guildOnly: false,
    args: false
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    message.author
        .send({ content: "https://discordapp.com/api/oauth2/authorize?client_id=583006737322475550&permissions=8&scope=bot" })
        .catch(error => {
            message.channel.send({ content: `${TxTE.emoji.x} It seems like I can't DM you!` });
        });
};