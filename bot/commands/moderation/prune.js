const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "prune",
    aliases: ["purge", "bulk", "delete"],
    category: "moderation",
    cooldown: 2,
    args: true,
    guildOnly: true
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    const amount = parseInt(args[0]) + 1;

    if (message.member.permissions.has(PermissionsBitField.Flags.ManageMembers) !== true)
        return message.channel.send({ content: `${TxTE.emoji.x} You cannot manage messages.` });

    if (isNaN(amount))
        return message.reply({ content: `${TxTE.emoji.quote} That doesn't seem to be a valid number.` });
    else if (amount <= 0 || amount >= 101)
        return message.reply({ content: `${TxTE.emoji.x} You need to input a number up to 100.` });


    message.channel.bulkDelete(amount, true).catch(err => {
        console.error(err);
        message.channel.send({ content: `${TxTE.emoji.windowText} There was an error while trying to prune messages in this channel.` });
    });
};
