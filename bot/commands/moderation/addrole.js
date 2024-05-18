const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "addrole",
    aliases: ["add"],
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

    let addRole;
    if (!args[1]) {
        addRole = message.mentions.roles.first();
    } else {
        addRole = message.guild.roles.cache.find(r => r.name === args[1]);
        if (!addRole)
            addRole = message.guild.roles.cache.get(args[1]);
    }

    let addMember = message.mentions.members.first();

    if (!addMember)
        return message.channel.send({ content: `${TxTE.emoji.quote} Please mention a member.` });
    if (!addRole)
        return message.channel.send({ content: `${TxTE.emoji.quote} I didn't find that role.` });
    if (addMember.roles.cache.some(r => r.id === addRole.id))
        return message.channel.send({ content: `${TxTE.emoji.x} Said member already has that role.` });

    try {
        addMember.roles.add(addRole);
        message.channel.send({ content: `${TxTE.emoji.ok} Added **${addRole.name}** to **${addMember}**.` });
    } catch (e) {
        console.log(e);
        message.channel.send({ content: `${TxTE.emoji.x} I seem to be unable to manage this role or member.` });
    }
};
