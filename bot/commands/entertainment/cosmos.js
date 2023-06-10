const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
  name: "cosmos",
  aliases: ['space'],
  category: "entertainment",
  cooldown: 3600,
  guildOnly: false,
  args: false
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => { // AgoQvLHiG3GAz3RFxNUgnku1kKUh0RyQZdMd3ErA
  fetch("https://api.nasa.gov/planetary/apod?api_key=skekn4vbGxhF5FMcQVNeQHPgrNyFCx1rrBrKDh7s")
    .then(res => res.json()).then(json => {
      var hdlink = `Click [here](${json.hdurl})`;
      if (!json.hdurl) {
        var hdlink = "No HD image provided.";
      }

      const embed = new Discord.EmbedBuilder()
        .setTitle(`Image of the day: ${json.title}`)
        .setDescription(json.explanation)
        .setImage(json.url)
        .addFields([{ name: "HD image", value: hdlink}])
        .setFooter({ text:`api.nasa.gov, ${json.date}.` });
      message.channel.send({ embeds: [embed] }).catch(error => {
        message.channel.send(
          `${TxTE.emoji.x} Something went wrong...`
        );
      });
    });
};
