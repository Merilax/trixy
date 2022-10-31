const masterIds = require('../../masterIds.json');

module.exports.commanddata = {
  name: "say",
  cooldown: 2,
  guildOnly: false,
  args: true,
  category: "devlocked"
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  if (message.author.id === masterIds.txdev) {
    let say = args.slice().join(" ");
    message.delete().catch(e => {});
    message.channel.send({ content: say });
  } else {
    return;
  }
};