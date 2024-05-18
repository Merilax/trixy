const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "removereward",
    aliases: ["remover", "rr"],
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
        return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may add EXP rewards!` });

    if (!message.guild.roles.cache.find(r => r.id === args[0]))
        message.channel.send({ content: `${TxTE.emoji.quote} I couldn't find a matching role, did you copy the right Id?` });

    const found = await db.XPRewards.findOne({
        where: { guild: message.guild.id, roleId: args[0] }
    });
    if (!found)
        return message.channel.send({ content: `${TxTE.emoji.x} This role is not being rewarded.` });

    await db.XPRewards.destroy({
        where: { guild: message.guild.id, roleId: args[0] }
    });

    message.channel.send({ content: `${TxTE.emoji.ok} This role won't be rewarded anymore.` });
};