const Reminder = require('../../DB/modals/Reminders.js');
const TxTE = require("../../TxTE.json");

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
  prefix
) => {
  let remindContent = args.slice(1).join(" ");
  let remindTimeStr = args[0];

  if (!remindContent)
    return message.channel.send({ content: `${TxTE.emoji.quote} You should tell me what to remind you.` });
  if (remindContent.length >= 2000)
    return message.channel.send({ content: `${TxTE.emoji.x} Your message must be below 2000 characters.` });
  if (remindTimeStr.match(/^\d+(m|h)$/i) != null) { } else {
    return message.channel.send({ content: `${TxTE.emoji.quote} When? The input will be in minutes (by default) or hours, as the first argument. For example, \`60m\` or \`1h\`, followed by your message.` });
  }

  let maxTime; let timeScale; let multiplier;
  let remindTimeInt;
  switch (remindTimeStr.toLowerCase().slice(-1)) {
    case "h":
      remindTimeInt = remindTimeStr.slice(0, -1)
      maxTime = 8760;
      timeScale = 'hours';
      multiplier = 3600000; //ms to h
      break;
    case "m":
      remindTimeInt = remindTimeStr.slice(0, -1)
      maxTime = 525600;
      timeScale = 'minutes';
      multiplier = 60000; //ms to m
      break;
  }
  
  let remindThen;
  if (remindTimeInt && (remindTimeInt < maxTime) && (remindTimeInt > 0)) {
    remindThen = Date.now() + (parseInt(remindTimeInt) * multiplier);
  } else {
    return message.channel.send({ content: `${TxTE.emoji.x} Can't do, you may set a maximum of 525600 minutes or 8760 hours, equivalent to 1 year.` });
  }

  try {
    await Reminder.create({ userId: message.author.id, duration: remindThen, content: remindContent });
    message.channel.send({ content: `${TxTE.emoji.ok} ${TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)]} I will remind you in ${remindTimeInt} ${timeScale}.` });
  } catch (e) {
    console.log(e);
  }
};
