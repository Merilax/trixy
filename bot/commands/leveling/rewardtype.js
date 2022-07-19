const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "rewardtype",
    aliases: ["rtype", "rt"],
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
    if (message.author.id !== message.guild.ownerId) return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may change the XP reward type!` });
    await db.XPRewardType.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id, isCumulative: true } });
    console.log()
    if (args[0].trim().match(/^(true|false)$/i)) {
        await db.XPRewardType.update({ isCumulative: args[0] }, { where: { guild: message.guild.id } });
        if (args[0] === "true") {
            message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]} Roles will now stack up as rewarded.` });
        } else {
            message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]} Members will only keep their highest reward role.` });
        }
    } else {
        message.channel.send({ content: `${TxTE.emoji.quote} Please specify \`true\` if you want role rewards to stack, or \`false\` if you only want to keep the top role.` });
    }
};