const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "rewardstack",
    aliases: ["rstack", "rs"],
    category: "levels",
    cooldown: 5,
    guildOnly: true,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    if (message.author.id !== message.guild.ownerId)
        return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may change the XP reward type!` });

    await db.guildLevelConfigDB.findOrCreate({
        where: { guildId: message.guild.id },
        defaults: { guildId: message.guild.id }
    });

    if (args[0].trim().match(/^(true|false)$/i)) {
        let affirmation = TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)];

        if (args[0] === "true") {
            await db.guildLevelConfigDB.update({ isCumulative: 1 }, {
                where: { guildId: message.guild.id }
            });
            message.channel.send({ content: `${TxTE.emoji.ok} ${affirmation} Roles will now stack up as rewarded.` });
        } else {
            await db.guildLevelConfigDB.update({ isCumulative: 0 }, {
                where: { guildId: message.guild.id }
            });
            message.channel.send({ content: `${TxTE.emoji.ok} ${affirmation} Members will only keep their highest reward role.` });
        }
    } else {
        message.channel.send({ content: `${TxTE.emoji.quote} Please specify \`true\` if you want role rewards to stack, or \`false\` if you only want to keep the top role.` });
    }
};