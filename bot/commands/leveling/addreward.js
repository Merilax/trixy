const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "addreward",
    aliases: ["addr", "ar"],
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
    if (message.author.id !== message.guild.ownerId) return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may add XP rewards!` });
    await db.guildLevelConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id, isCumulative: true } });

    if (!message.guild.roles.cache.find(r => r.id === args[0])) return message.channel.send({ content: `${TxTE.emoji.quote} I couldn't find a matching role, did you copy the right Id?` });
    if (args[1] > 999 || args[1] < 1) return message.channel.send({ content: `${TxTE.emoji.quote} Invalid target level, must be between 1 and 999.` });
    if (!args[1]) return message.channel.send({ content: `${TxTE.emoji.quote} Invalid target level, must be between 1 and 999.` });;

    const [found, created] = await db.XPRewards.findOrCreate({ where: { guild: message.guild.id, roleId: args[0] }, defaults: { guild: message.guild.id, roleId: args[0], level: args[1] } })
    if (created) return message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]} The role **${message.guild.roles.cache.find(r => r.id === args[0]).name}** will be given out at level ${args[1]}` });

    //console.log(found.level.toString());
    //console.log(args[1]);
    if (found.level.toString() === args[1]) { return message.channel.send({ content: `${TxTE.emoji.x} Only one role can be rewarded per level.` }); }

    await db.XPRewards.update({ level: args[1] }, { where: { guild: message.guild.id, roleId: args[0] } });
    message.channel.send({ content: `${TxTE.emoji.ok} The target level for this role has changed to ${args[1]}` });
};