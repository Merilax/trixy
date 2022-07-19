const db = require('../../DB/sequelDB.js');
const PersonalCard = require('../../DB/modals/PersonalCard');
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
    const [xpenable, xpCreated] = await db.XPEnabled.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id } });
    if (xpenable.enabled === false) { return }
    const userColour = await PersonalCard.findOne({ discordId: message.author.id });
    const newColour = args[0].trim();
    if (newColour.match(/^#[0-9a-f]{3,6}$/i)) {
        try {
            if (userColour) {
                await PersonalCard.findOneAndUpdate({ discordId: message.author.id }, { color: newColour });
                message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.success[Math.floor(Math.random() * TxTE.success.length)]}` });
            } else {
                await PersonalCard.create({
                    discordId: message.author.id,
                    color: newColour
                });
                message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.success[Math.floor(Math.random() * TxTE.success.length)]}` });
            }
        } catch (err) {
            console.log(err);
            message.channel.send({ content: `${TxTE.emoji.x} Something went wrong...` });
        }
    } else {
        return message.channel.send({ content: `${TxTE.emoji.quote} Colour must be in hexadecimal format.` });
    }
};