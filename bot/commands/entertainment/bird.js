const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

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
    const embed = new Discord.EmbedBuilder()
      .setImage(json.link)
      .setTitle("Here you go! :bird:")
      .setColor("#4badeb")
      .setFooter({ text:"https://some-random-api.ml/img/birb" });
    return message.channel.send({ embeds: [embed] })
      .catch(error => {
        message.channel.send(
          `${TxTE.emoji.x} Something went wrong...`
        );
      });
  });
};