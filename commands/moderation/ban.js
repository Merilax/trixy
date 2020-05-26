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
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  if (message.member.hasPermission("BAN_MEMBERS") === false) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot ban members."
    );
  }

  if (!message.mentions.users.size) {
    return message.channel.send(
      "<:quote:614100269386432526> You need to tag a member."
    );
  }

  const banauthor = message.author;
  const banuser = message.mentions.members.first();
  let reason = args.slice(1).join(" ");

  if (banuser === message.author) {
    return message.channel.send(
      "<:delete:614100269369655306> You can't ban yourself."
    );
  }

  if (banuser.banable === false) {
    return message.channel.send(
      "<:delete:614100269369655306> I cannot ban this user."
    );
  } else {
    banuser.ban(reason);
    message.channel.send(
      `<:approve:614100268891504661> ${banauthor} succesfully banned ${banuser.username}. Reason: ${reason}`
    );
  }
};
