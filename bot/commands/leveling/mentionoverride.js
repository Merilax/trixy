const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "mentionoverride",
    aliases: ['morr'],
    category: "levels",
    cooldown: 10,
    guildOnly: false,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    await db.guildLevelConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id } });

    if (args[0].trim().match(/^(true|false|reset)$/i)) {
        if (args[0] === "true") {
            await db.guildLevelConfigDB.update({ doMention: 1 }, { where: { guildId: message.guild.id } });
            message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]} You will be mentioned upon levelling up. This will override guild configurations.` });
        } else if (args[0] === "false") {
            await db.guildLevelConfigDB.update({ doMention: 0 }, { where: { guildId: message.guild.id } });
            message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]} You won't be mentioned upon levelling up. This will override guild configurations.` });
        } else {
            await db.guildLevelConfigDB.update({ doMention: null }, { where: { guildId: message.guild.id } });
        }
    } else {
        message.channel.send({ content: `${TxTE.emoji.quote} Please specify \`true\` if you want to be mentioned upon levelling up, or \`false\` otherwise.` });
    }
};