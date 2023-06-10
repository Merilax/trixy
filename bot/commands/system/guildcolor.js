const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "guildcolor",
    category: "system",
    cooldown: 10,
    guildOnly: true,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    if (message.author.id !== message.guild.ownerId) return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may change the prefix!` });

    const [xpEnable, xpCreated] = await db.guildConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id } });
    if (xpEnable.xpEnabled === false) return message.channel.send({ content: `${TxTE.emoji.x} Level system must be enabled.` });

    const newColour = args[0].trim();
    if (newColour.match(/^#[0-9a-f]{3,6}$/i)) {
        try {
            const [guildColour, created] = await db.guildConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { color: newColour } });
            if (created) { } else {
                if (newColour === "#000000" || newColour === "#000") {
                    await db.guildConfigDB.updateOne({ color: null }, { where: { guildId: message.guild.id } });
                    message.channel.send({ content: `${TxTE.emoji.ok} Custom colour disabled. Try #001 if you wanted black.` });
                } else {
                    await db.guildConfigDB.updateOne({ color: newColour }, { where: { guildId: message.guild.id } });
                    message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.success[Math.floor(Math.random() * TxTE.success.length)]}` });
                }
            }
        } catch (e) {
            console.log(e);
            message.channel.send({ content: `${TxTE.emoji.x} Something went wrong...` });
        }
    } else {
        message.channel.send({ content: `${TxTE.emoji.quote} Color must be in hexadecimal format.` });
    }
};