const Discord = require("discord.js");
const db = require('../../DB/db.js');

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
    if (message.author.id !== message.guild.ownerID) return message.channel.send("<:block:614100269004881924> Only the server owner may add XP rewards!");

    if (!message.guild.roles.cache.find(r => r.id === args[0])) { message.channel.send("<:quote:614100269386432526> I couldn't find a matching role, did you copy the right ID?"); }

    const found = await db.XPRewards.findOne({ where: { guild: message.guild.id, roleId: args[0] }});
    if (!found) return message.channel.send(`<:delete:614100269369655306> The role ${message.guild.roles.cache.find(r => r.id === args[0]).name} is not being rewarded.`);
    await db.XPRewards.destroy({ where: { guild: message.guild.id, roleId: args[0] } });
    message.channel.send(`<:approve:614100268891504661> The role **${message.guild.roles.cache.find(r => r.id === args[0]).name}** won't be rewarded anymore.`);
};