const nodefetch = require("node-fetch");
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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  nodefetch("https://randomfox.ca/floof/?ref=public-apis").then(res => res.json()).then(json => {
    const embed = new Discord.MessageEmbed()
      .setImage(json.image)
      .setTitle("Here you go! :fox:")
      .setColor("BLUE")
      .setFooter("https://randomfox.ca/floof/?ref=public-apis");
    message.channel.send(embed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> Something went wrong..."
      );
    });;
  });
};