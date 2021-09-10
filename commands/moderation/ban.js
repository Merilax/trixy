const Discord = require("discord.js");

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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  if (!message.member.hasPermission("BAN_MEMBERS")) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot ban members."
    );
  }

  if (!message.mentions.users.size) {
    return message.channel.send(
      "<:quote:614100269386432526> You need to tag a member."
    );
  }

  const banuser = message.mentions.members.first();
  let banreason = args.slice(1).join(" ");

  if (banuser === message.author) {
    return message.channel.send(
      "<:delete:614100269369655306> You can't ban yourself."
    );
  }

  if (!banuser.banable) {
    return message.channel.send(
      "<:delete:614100269369655306> I cannot ban this user."
    );
  } else {
    banuser.ban({reason: banreason});
    message.channel.send(
      `<:approve:614100268891504661> ${message.author} succesfully banned **${banuser.user.username}**. Reason: ${banreason}`
    );
  }
};
