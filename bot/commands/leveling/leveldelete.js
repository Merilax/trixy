const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

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
    if (message.author.id !== message.guild.ownerId) return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may erase level progress!` });

    const deleteId = args[0];
    const level = await db.Levels.findOne({ where: { guild: message.guild.id, userId: deleteId } });

    if (level == null) {
        return message.channel.send({ content: `${TxTE.emoji.x} This user was not found. Remember to use an Id.` });
    } else {
        await db.Levels.destroy({ where: { guild: message.guild.id, userId: deleteId } });
        message.channel.send({ content: `${TxTE.emoji.x} Successfully removed from database.` });
    }
};