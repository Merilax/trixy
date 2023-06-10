const config = require('../../config.json');

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
  if (message.author.id !== config.ownerID) {
    return;
  } else message.guild.leave();
};
