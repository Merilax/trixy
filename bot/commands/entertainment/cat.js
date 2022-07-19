const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
  name: "cat",
  aliases: ["kitty"],
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
  fetch("https://aws.random.cat/meow").then(res => res.json()).then(json => {
    const file = new Discord.AttachmentBuilder()
    const embed = new Discord.EmbedBuilder()
      .setImage(json.file)
      .setTitle("Here you go! :cat:")
      .setColor("#4badeb")
      .setFooter({text:"https://aws.random.cat/meow"});
    return message.channel.send({ embeds: [embed] })
      .catch(error => {
        message.channel.send(
          `${TxTE.emoji.x} Something went wrong...`
        );
      });
  });
};