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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  if (message.member.hasPermission("KICK_MEMBERS") === false) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot kick members."
    );
  }

  if (!message.mentions.users.size) {
    return message.channel.send(
      "<:quote:614100269386432526> You need to tag a member."
    );
  }

  const kickauthor = message.author;
  const kickuser = message.mentions.members.first();
  //const kickusername = args[0];
  //const kickguild = message.channel.guild;
  //var kickid = kickusername.slice(2, -1);
  //const kickchan = message.kickusername.slice(2, -1);
  let reason = args.slice(1).join(" ");

  //console.log(kickchan);

  if (kickuser === message.author) {
    return message.channel.send(
      "<:delete:614100269369655306> You can't kick yourself."
    );
  }

  if (kickuser.kickable === false) {
    return message.channel.send(
      "<:delete:614100269369655306> I cannot kick this user."
    );
  } else {
    //kickchan.send(`You've been kicked from ${kickguild} because: ${reason}`).catch(trashlog => { });
    kickuser.kick();
    message.channel.send(
      `<:approve:614100268891504661> ${kickauthor} succesfully kicked **${kickuser.user.username}**. Reason: ${reason}`
    );
  }
};
