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
  if (!message.mentions.users.size) {
    return message.channel.send({ content: `Your avatar: ${message.author.displayAvatarURL()}` });
  }

  const avatarList = message.mentions.users.map(user => {
    return `${user.username}'s avatar: ${user.displayAvatarURL()}`;
  });

  message.channel.send({ content: avatarList });
};