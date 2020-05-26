const snekfetch = require("snekfetch");
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
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  snekfetch
    .get(
      "https://api.nasa.gov/planetary/apod?api_key=AgoQvLHiG3GAz3RFxNUgnku1kKUh0RyQZdMd3ErA"
    )
    .then(res => {
      var cosmos = JSON.parse(res.raw);
      var hdlink = `Click [here](${cosmos.hdurl})`;
      if (!cosmos.hdurl) {
        var hdlink = "No image provided.";
      }

      const embed = new Discord.RichEmbed()
        .setTitle(`Image of the day: ${cosmos.title}`)
        .setDescription(cosmos.explanation)
        .setImage(cosmos.url)
        .addBlankField()
        .addField("HD image", hdlink)
        .setFooter(`api.nasa.gov, ${cosmos.date}.`);
      message.channel.send(embed);
    });
};
