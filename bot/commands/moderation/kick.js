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
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot kick members."
    );
  }

  if (!message.mentions.users.size) {
    return message.channel.send(
      "<:quote:614100269386432526> You need to tag a member."
    );
  }

  const kickuser = message.mentions.members.first();
  let reason = args.slice(1).join(" ");


  if (kickuser === message.author) {
    return message.channel.send(
      "<:delete:614100269369655306> You can't kick yourself."
    );
  }

  if (kickuser.kickable == false) {
    return message.channel.send(
      "<:delete:614100269369655306> I cannot kick this user."
    );
  } else {
    kickuser.kick();
    message.channel.send(
      `<:approve:614100268891504661> ${message.author} succesfully kicked **${kickuser.user.username}**. Reason: ${reason}`
    );
  }
};
