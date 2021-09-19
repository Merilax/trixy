const db = require('../../DB/sequelDB.js');

module.exports.commanddata = {
  name: "remind",
  aliases: ["remindme", "note"],
  category: "utility",
  cooldown: 2,
  args: true,
  guildOnly: false
};

module.exports.run = async (
  bot,
  message,
  args,
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  let remindContent = args.slice(1).join(" ");
  let remindTiming = args[0];

  if (!remindContent)
    return message.channel.send("<:quote:614100269386432526> You should tell me what to remind you.");
  if (remindTiming.match(/^\d+$/) != null) { } else {
    return message.channel.send("<:quote:614100269386432526> For how long? The input will be in minutes, as the first argument.");
  }

  if (remindTiming && (remindTiming < 525600) && (remindTiming > 0)) {
    var remindThen = Date.now() + (parseInt(remindTiming) * 60000);
  } else {
    return message.channel.send("<:delete:614100269369655306> That's not right, you may set a maximum of 525600 minutes, which is actually a year.");
  }

  try {
    await db.Mutes.create({ userId: message.author.id, duration: remindThen, text: remindContent });
    message.channel.send(`<:approve:614100268891504661> Alright! I will remind you in ${remindTiming} minutes.`);
  } catch (e) {
    console.log(e);
  }
};
