const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');

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
    prefix
) => {
    if (message.author.id !== message.guild.ownerID) return message.channel.send("<:block:614100269004881924> Only the server owner may erase level progress!");

    const deleteId = args[0];
    const level = await db.Levels.findOne({ where: { guild: message.guild.id, userId: deleteId } });

    if (level == null) {
        return message.channel.send("<:delete:614100269369655306> This user was not found. Remember to use IDs.");
    } else {
        await db.Levels.destroy({ where: { guild: message.guild.id, userId: deleteId } });
        message.channel.send(`<:delete:614100269369655306> Successfully removed from database.`);
    }
};