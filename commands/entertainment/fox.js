const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports.commanddata = {
  name: "fox",
  aliases: ["foxy"],
  category: "entertainment",
  cooldown: 2,
  guildOnly: false,
  args: false
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
  snekfetch.get("https://randomfox.ca/floof/?ref=public-apis").then(res => {
    var fox = JSON.parse(res.raw);
    const embed = new Discord.RichEmbed()
      .setImage(fox.image)
      .setTitle("Here you go! :fox:")
      .setColor("BLUE")
      .setFooter("https://randomfox.ca/floof/?ref=public-apis");
    message.channel.send(embed);
  });
};