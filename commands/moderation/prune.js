module.exports.commanddata = {
  name: "prune",
  aliases: ["purge", "bulk", "delete"],
  category: "moderation",
  cooldown: 2,
  args: true,
  guildOnly: true
};

module.exports.run = (
  bot,
  message,
  args,
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  const amount = parseInt(args[0])+1;

  if (message.member.hasPermission("MANAGE_MESSAGES") !== true) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot manage messages."
    );
  }

  if (isNaN(amount)) {
    return message.reply(
      "<:quote:614100269386432526> That doesn't seem to be a valid number."
    );
  } else if (amount <= 0 || amount >= 101) {
    return message.reply(
      "<:delete:614100269369655306> You need to input a number between 1 and 100."
    );
  }

  message.channel.bulkDelete(amount, true).catch(err => {
    console.error(err);
    message.channel.send(
      "<:window_text:614100269524975620> There was an error while trying to prune messages in this channel."
    );
  });
};
