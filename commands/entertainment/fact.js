const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports.commanddata = {
  name: "fact",
  category: "entertainment",
  cooldown: 3,
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
    .get("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => {
      var fact = JSON.parse(res.raw);

      var embed = new Discord.RichEmbed()
        .addField("Did you know...", fact.text)
        .setColor("BLUE")
        .setFooter("uselessfacts.jsph.pl");
      message.channel.send(embed);
    });
};
