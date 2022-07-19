const masterIds = require('../../masterIds.json');

module.exports.commanddata = {
  name: "retreat",
  cooldown: 2,
  args: false,
  guildOnly: true,
  category: "devlocked"
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  if (message.author.id !== masterIds.txdev) {
    return;
  } else message.guild.leave();
};
