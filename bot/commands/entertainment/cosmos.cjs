import fetch from "node-fetch";
const Discord = require("discord.js");

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
) => {
  fetch("https://api.nasa.gov/planetary/apod?api_key=AgoQvLHiG3GAz3RFxNUgnku1kKUh0RyQZdMd3ErA")
    .then(res => res.json()).then(json => {
      var hdlink = `Click [here](${json.hdurl})`;
      if (!json.hdurl) {
        var hdlink = "No HD image provided.";
      }

      const embed = new Discord.MessageEmbed()
        .setTitle(`Image of the day: ${json.title}`)
        .setDescription(json.explanation)
        .setImage(json.url)
        .addField("HD image", hdlink)
        .setFooter(`api.nasa.gov, ${json.date}.`);
      message.channel.send(embed).catch(error => {
        message.channel.send(
          "<:delete:614100269369655306> Something went wrong..."
        );
      });;
    });
};
