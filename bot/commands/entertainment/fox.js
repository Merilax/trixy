const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

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
  prefix
) => {
  fetch("https://randomfox.ca/floof/?ref=public-apis").then(res => res.json()).then(json => {
    const embed = new Discord.EmbedBuilder()
      .setImage(json.image)
      .setTitle("Here you go! :fox:")
      .setColor("#4badeb")
      .setFooter({ text:"https://randomfox.ca/floof/?ref=public-apis" });
    message.channel.send({ embeds: [embed] }).catch(error => {
      message.channel.send(
        `${TxTE.emoji.x} Something went wrong...`
      );
    });;
  });
};