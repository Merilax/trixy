const fs = require("fs");

module.exports.commanddata = {
  name: "remind",
  aliases: ["remindme", "note"],
  category: "utility",
  cooldown: 2,
  args: true,
  guildOnly: false
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
  const fs = require("fs");

  let remindcontent = args.slice(1).join(" ");
  let remindtiming = args[0];

  if (!remindcontent)
    return message.channel.send(
      "<:quote:614100269386432526> You should tell me what to remind you."
    );
  if (remindtiming.match(/^\d+$/) != null) {
  } else {
    return message.channel.send("<:quote:614100269386432526> For how long? The input will be in minutes, at the beginning of the command.");
  }

  bot.reminders[message.author.id] = {
    user: message.author.id,
    time: Date.now() + parseInt(args[0]) * 60000,
    content: remindcontent
  };

  fs.writeFile(
    "./reminders.json",
    JSON.stringify(bot.reminders, null, 4),
    err => {
      if (err) throw err;
      message.channel.send(`<:approve:614100268891504661> Reminder set.`);
    }
  );
};
