const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');

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
    if (message.author.id !== message.guild.ownerID) return message.channel.send("<:block:614100269004881924> Only the server owner may add XP rewards!");
    await db.XPRewardType.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id, isCumulative: true } });

    if (!message.guild.roles.cache.find(r => r.id === args[0])) return message.channel.send("<:quote:614100269386432526> I couldn't find a matching role, did you copy the right ID?");
    if (args[1] > 999 || args[1] < 1) return message.channel.send("<:quote:614100269386432526> Invalid target level, must be between 1 and 999.");
    if (!args[1]) return message.channel.send("<:quote:614100269386432526> Invalid target level, must be between 1 and 999.");;

    const [found, created] = await db.XPRewards.findOrCreate({ where: { guild: message.guild.id, roleId: args[0] }, defaults: { guild: message.guild.id, roleId: args[0], level: args[1] } })
    if (created) return message.channel.send(`<:approve:614100268891504661> Understood! The role **${message.guild.roles.cache.find(r => r.id === args[0]).name}** will be given out at level ` + args[1]);
    
    console.log(found.level.toString());
    console.log(args[1]);
    if (found.level.toString() === args[1]) {return message.channel.send("<:delete:614100269369655306> Only one role can be rewarded per level.");}
    
    await db.XPRewards.update({ level: args[1] }, { where: { guild: message.guild.id, roleId: args[0] } });
    message.channel.send(`<:approve:614100268891504661> The target level for this role has changed to ${args[1]}`);
};