const Discord = require("discord.js");

module.exports.commanddata = {
  name: "suggest",
  aliases: ["suggestion"],
  category: "system",
  cooldown: 5,
  guildOnly: false,
  args: true
};

module.exports.run = async (
  bot,
  message,
  args,
  prefix
) => {
  var embed = new Discord.MessageEmbed()
    .setTitle("A new suggestion has arrived!")
    .setDescription(args.join(" "))
    .setColor("BLUE")
    .setFooter(message.author.tag + " / " + message.author.id);
  const ch = await bot.channels.cache.find(ch => ch.id === "602469256864595968");
  ch.send(embed);
  message.channel.send("<:approve:614100268891504661> Suggestion sent, maybe the owner will even get in touch with you!")
};
