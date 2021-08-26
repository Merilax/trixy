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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  if (message.author.id == ownerid) {
    let say = args.slice().join(" ");
    message.delete().catch(trashlog => {});
    message.channel.send(say);
  } else {
    return;
  }
};