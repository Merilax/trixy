const db = require('../../DB/sequelDB.js');
const GuildCard = require('../../DB/modals/GuildCard');
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

    const [xpenable, xpCreated] = await db.XPEnabled.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id } });
    if (xpenable.enabled === false) { return }
    const guildColour = await GuildCard.findOne({ discordId: message.guild.id });
    const newColour = args[0].trim();
    if (newColour.match(/^#[0-9a-f]{3,6}$/i)) {
        try {
            if (guildColour) {
                await GuildCard.findOneAndUpdate({ discordId: message.guild.id }, { color: newColour });
                message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.success[Math.floor(Math.random() * TxTE.success.length)]}` });
            } else {
                await GuildCard.create({
                    discordId: message.guild.id,
                    color: newColour
                });
                message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.success[Math.floor(Math.random() * TxTE.success.length)]}` });
            }
        } catch (err) {
            console.log(err);
            message.channel.send({ content: `${TxTE.emoji.x} Something went wrong...` });
        }
    } else {
        return message.channel.send({ content: `${TxTE.emoji.quote} Color must be in hexadecimal format.` });
    }
};