module.exports.commanddata = {
  name: "avatar",
  category: "utility",
  cooldown: 2,
  guildOnly: false,
  args: false
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  if (!message.guild) {
    return message.channel.send({ content: `Your avatar: ${message.author.displayAvatarURL()}` });
  }

  let member = message.mentions.members.first();
  if (!member) {
    return message.channel.send({ content: `Your avatar: ${message.author.displayAvatarURL()}` });
  }

  message.channel.send({ content: `${member.user.username}'s avatar: ${member.user.displayAvatarURL()}` });
};