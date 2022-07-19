const Discord = require("discord.js");
const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
  name: "ban",
  category: "moderation",
  cooldown: 5,
  args: true,
  guildOnly: true
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
    return message.channel.send({ content: `${TxTE.emoji.x} You cannot ban members.` });
  }

  if (!message.mentions.users.size) {
    return message.channel.send({ content: `${TxTE.emoji.quote} You need to tag a member.` });
  }

  const banuser = message.mentions.members.first();
  let banreason = args.slice(1).join(" ");

  if (banuser === message.author) {
    return message.channel.send({ content: `${TxTE.emoji.x} You can't ban yourself.` });
  }

  if (banuser.banable == false) {
    return message.channel.send({ content: `${TxTE.emoji.x} I cannot ban this user.` });
  } else {
    banuser.ban({ reason: banreason });
    message.channel.send({ content: `${TxTE.emoji.ok} ${message.author} succesfully banned **${banuser.user.username}**. Reason: ${banreason}` });
  }
};
