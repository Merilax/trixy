const Discord = require("discord.js");
const db = require('../../DB/db.js');

module.exports.commanddata = {
    name: "leveldelete",
    aliases: ['lvldelete', 'rankdelete'],
    category: "levels",
    cooldown: 3,
    guildOnly: true,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    txdev,
    prefix,
    faces_archive,
    queue
) => {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("<:block:614100269004881924> Only the server owner may erase level progress!");

    const member = message.mentions.members.first();
    const level = await db.Levels.findOne({ where: { guild: message.guild.id, userId: user.id } });

    if (level == null) {
        return message.channel.send("<:delete:614100269369655306> This user has not yet sent a message here! Nothing to delete.");
    } else {
        await db.Levels.destroy({ where: { guild: message.guild.id, userId: member.user.id } });
        message.channel.send(`<:delete:614100269369655306> Successfully removed ${member.user.tag}.`);
    }
};