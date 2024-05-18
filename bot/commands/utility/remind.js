const Reminder = require('../../DB/modals/Reminders.js');
const TxTE = require("../../TxTE.json");
const { parseCommandTime } = require("../../utils/textParser.js");

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

    let time, multiplier, scale;
    try {
        [time, multiplier, scale] = parseCommandTime(remindTimeStr);
    } catch (error) {
        return message.channel.send({ content: `${TxTE.emoji.x} ${error.message}` });
    }

    let remindAt = Date.now() + (time * multiplier);
    let affirmation = TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)];

    try {
        await Reminder.create({ userId: message.author.id, duration: remindAt, content: remindContent });
        message.channel.send({ content: `${TxTE.emoji.ok} ${affirmation} I will remind you in ${time} ${scale}.` });
    } catch (e) {
        console.log(e);
    }
};
