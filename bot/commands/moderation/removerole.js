const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "removerole",
    aliases: ["remove"],
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
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles))
        return message.channel.send({ content: `${TxTE.emoji.x} You cannot manage roles.` });

    let removeRole;
    if (!args[1]) {
        removeRole = message.mentions.roles.first();
    } else {
        removeRole = message.guild.roles.cache.find(r => r.name === args[1]);
        if (!removeRole)
            removeRole = message.guild.roles.cache.get(args[1]);
    }

    let removeMember = message.mentions.members.first();

    if (!removeMember)
        return message.channel.send({ content: `${TxTE.emoji.quote} Please mention an user.` });
    if (!removeRole)
        return message.channel.send({ content: `${TxTE.emoji.quote} I didn't find that role.` });
    if (!removeMember.roles.cache.some(r => r.id === removeRole.id))
        return message.channel.send({ content: `${TxTE.emoji.x} User does not have that role.` });

    try {
        removeMember.roles.remove(checkRoleType(args[1]));
        message.channel.send({ content: `${TxTE.emoji.ok} Removed **${removeRole.name}** from **${removeMember}**.` });
    } catch (e) {
        console.log(e);
        message.channel.send({ content: `${TxTE.emoji.x} I seem to be unable to manage this role or user.` });
    }
};
