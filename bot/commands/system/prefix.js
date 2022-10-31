const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "prefix",
    category: "system",
    cooldown: 20,
    guildOnly: true,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    const newPrefix = args[0].trim().toLowerCase();

    if (message.author.id !== message.guild.ownerId) return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may change the prefix!` });
    if (newPrefix.length > 11) return message.channel.send({ content: `${TxTE.emoji.quote} Prefix can be at most 10 characters long.` });
    if (newPrefix.match(/^[\w\d\s\W]{1,10}$/i) === false) return message.channel.send({ content: `${TxTE.emoji.quote} Prefix can only contain letters, numbers, special characters like ! or - and whitespaces.` });

    const [prefixDB, created] = await db.guildConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id, prefix: newPrefix } });
    if (created) { } else {
        if (newPrefix === "reset") {
            await db.guildConfigDB.destroy({ where: { guildId: message.guild.id } });
            return message.channel.send({ content: `${TxTE.emoji.ok} Custom prefix deleted.` });
        }
        await db.guildConfigDB.update({ prefix: newPrefix }, { where: { guildId: message.guild.id } });
        message.channel.send({ content: `${TxTE.emoji.ok} Prefix updated to \`${newPrefix}\`! I will still respond to the original prefix too, just in case.` });
    }
    
};