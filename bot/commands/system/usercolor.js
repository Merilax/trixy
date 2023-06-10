const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "usercolor",
    category: "system",
    cooldown: 10,
    guildOnly: false,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    const newColour = args[0].trim();
    if (newColour.match(/^#[0-9a-f]{3,6}$/i)) {
        try {
            const [userColour, created] = await db.userConfigDB.findOrCreate({ where: { userId: message.author.id }, defaults: { color: newColour } });
            if (created) { } else {
                if (newColour === "#000000" || newColour === "#000") {
                    await db.userConfigDB.updateOne({ color: null }, { where: { userId: message.author.id } });
                    message.channel.send({ content: `${TxTE.emoji.ok} Custom colour disabled. Try #001 if you wanted black.` });
                } else {
                    await db.userConfigDB.updateOne({ color: newColour }, { where: { userId: message.author.id } });
                    message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.success[Math.floor(Math.random() * TxTE.success.length)]}` });
                }
            }
        } catch (err) {
            console.log(err);
            message.channel.send({ content: `${TxTE.emoji.x} Something went wrong...` });
        }
    } else {
        message.channel.send({ content: `${TxTE.emoji.quote} Colour must be in hexadecimal format.` });
    }
};