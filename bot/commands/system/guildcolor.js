const db = require('../../DB/sequelDB.js');
const GuildCard = require('../../DB/modals/GuildCard');

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
    const [xpenable, xpCreated] = await db.XPEnabled.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id } });
    if (xpenable.enabled === false) { return }
    const guildColour = await GuildCard.findOne({ discordId: message.guild.id });
    const newColour = args[0].trim();
    if (newColour.match(/^#[0-9a-f]{3,6}$/i)) {
        try {
            if (guildColour) {
                await GuildCard.findOneAndUpdate({ discordId: message.guild.id }, { color: newColour });
                message.channel.send("<:approve:614100268891504661> Success!");
            } else {
                await GuildCard.create({
                    discordId: message.guild.id,
                    color: newColour
                });
                message.channel.send("<:approve:614100268891504661> Success!");
            }
        } catch (err) {
            console.log(err);
            message.channel.send("<:delete:614100269369655306> Something went wrong...");
        }
    } else {
        return message.channel.send("<:quote:614100269386432526> Color must be in hexadecimal format.");
    }
};