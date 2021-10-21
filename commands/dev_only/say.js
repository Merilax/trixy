const masterIDs = require('../../masterIDs.json');

module.exports.commanddata = {
  name: "say",
  cooldown: 2,
  guildOnly: false,
  args: true,
  category: "dev_only"
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  if (message.author.id == masterIDs.txdev) {
    let say = args.slice().join(" ");
    message.delete().catch(trashlog => {});
    message.channel.send(say);
  } else {
    return;
  }
};