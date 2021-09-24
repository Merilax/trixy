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
  txdev,
  prefix,
  faces_archive
) => {
  let dice = args.slice().join(" ");

  if (dice.isNaN === true) {
    return message.channel.send(
      "<:delete:614100269369655306> If you really want an unique dice, you can use negative numbers too, but I am not rolling that thing you sent."
    );
  } else {
    var diceresult = Math.floor(Math.random() * dice) + 1;
    message.channel.send(`<:puzzle:614100269487226942> It's ${diceresult}.`);
  }
};