const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "levelchannel",
    aliases: ['setchannel', 'lvlchannel', "setch", "lvlch"],
    category: "levels",
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
    if (message.author.id !== message.guild.ownerId) return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may change the level-up channel!` });
    await db.guildLevelConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id, isCumulative: true } });

    if (args[0] === "reset") {
        await db.guildLevelConfigDB.updateOne({ targetChannel: null }, { where: { guildId: message.guild.id } });
        return message.channel.send({ content: `${TxTE.emoji.ok} Level-up announcements will no longer happen in a specific channel.` });
    }

    if (message.guild.channels.cache.find(ch => ch.id === args[0])) {
        try {
            var target = message.guild.channels.cache.find(ch => ch.id === args[0]).id;
            await db.guildLevelConfigDB.updateOne({ targetChannel: target }, { where: { guildId: message.guild.id } });
            message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]}` });
        } catch (err) {
            message.channel.send({ content: `${TxTE.emoji.x} Something went wrong...` });
        }
    } else {
        return message.channel.send({ content: `${TxTE.emoji.x} I can't find that channel. Are you using IDs? Do I have permission to write there?` });
    }
};