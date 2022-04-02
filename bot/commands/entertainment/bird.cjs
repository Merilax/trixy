import fetch from "node-fetch";
const Discord = require("discord.js");

module.exports.commanddata = {
  name: "bird",
  aliases: ["birb"],
  category: "entertainment",
  cooldown: 2,
  guildOnly: false,
  args: false
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  fetch("https://some-random-api.ml/img/birb").then(res => res.json()).then(json => {
    const embed = new Discord.MessageEmbed()
      .setImage(json.link)
      .setTitle("Here you go! :bird:")
      .setColor("BLUE")
      .setFooter("https://some-random-api.ml/img/birb");
    return message.channel.send(embed);
  });
};