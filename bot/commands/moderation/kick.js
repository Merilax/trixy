const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "kick",
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
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers))
        return message.channel.send({ content: `${TxTE.emoji.x} You cannot kick members.` });

    if (!message.mentions.users.size)
        return message.channel.send({ content: `${TxTE.emoji.quote} You need to tag a member.` });

    const kickuser = message.mentions.members.first();
    let reason = args.slice(1).join(" ");

    if (kickuser === message.author)
        return message.channel.send({ content: `${TxTE.emoji.x} You can't kick yourself.` });

    if (kickuser.kickable == false)
        return message.channel.send({ content: `${TxTE.emoji.x} I cannot kick this user.` });

    kickuser.kick();
    message.channel.send({ content: `${TxTE.emoji.ok} ${message.author} succesfully kicked **${kickuser.user.username}**. Reason: ${reason}` });

};
