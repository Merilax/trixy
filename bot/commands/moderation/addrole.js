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

  function checkRoleType(arg) {
    if (message.guild.roles.cache.find(r => r.name === arg)) {
      return message.guild.roles.cache.find(r => r.name === arg);
    } else if (message.guild.roles.cache.get(arg)) {
      return message.guild.roles.cache.get(arg);
    } else {
      return message.mentions.roles.first();
    }
  }

  let addMember = message.mentions.members.first();
  var addRole = checkRoleType(args[1]);

  if (!addMember)
    return message.channel.send({ content: `${TxTE.emoji.quote} Please mention a user.` });
  if (!addRole)
    return message.channel.send({ content: `${TxTE.emoji.quote} I didn't find that role.` });
  if (addMember.roles.cache.some(r => r.id === addRole.id))
    return message.channel.send({ content: `${TxTE.emoji.x} But you already have that role...` });

  try {
    addMember.roles.add(addRole);
    message.channel.send({ content: `${TxTE.emoji.ok} Added **${addRole.name}** to **${addMember}**.` });
  } catch (e) {
    console.log(e);
    message.channel.send({ content: `${TxTE.emoji.x} I seem to be unable to manage this role or user.` });
  }
};
