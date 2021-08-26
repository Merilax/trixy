module.exports.commanddata = {
  name: "retreat",
  cooldown: 2,
  args: false,
  guildOnly: true,
  category: "dev_only"
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
  if (message.author.id !== ownerid) {
    return;
  } else message.guild.leave();
};
