const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "roll",
    aliases: ["dice", "random"],
    category: "entertainment",
    cooldown: 2,
    guildOnly: false,
    args: true
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    let dice = args.slice().join(" ");

    if (dice.isNaN) {
        return message.channel.send(
            `${TxTE.emoji.x} If you really want unique dice, you can use negative numbers, but I am not rolling whatever you sent.`
        );
    } else {
        let diceresult = Math.floor(Math.random() * dice) + 1;
        message.channel.send({ content: `${TxTE.emoji.puzzle} It's ${diceresult}.` });
    }
};