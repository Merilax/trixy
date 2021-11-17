module.exports.commanddata = {
  name: "ping",
  aliases: ["latency"],
  category: "system",
  cooldown: 2,
  guildOnly: false,
  args: false
};

module.exports.run = async (
  bot,
  message,
  args,
  prefix
) => {
  const m = await message.channel.send("Pinging");
  m.edit(
    `<:bar_chart2:614100269306871819> Latency: ${m.createdTimestamp -
      message.createdTimestamp}ms, API Latency: ${Math.round(bot.ws.ping)}ms`
  );
};
