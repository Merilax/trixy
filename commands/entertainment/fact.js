const nodefetch = require("node-fetch");
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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  nodefetch
    .get("https://uselessfacts.jsph.pl/random.json?language=en")
    .then(res => res.json()).then(json => {

      var embed = new Discord.MessageEmbed()
        .addField("Did you know...", json.text)
        .setColor("BLUE")
        .setFooter("uselessfacts.jsph.pl");
      message.channel.send(embed).catch(error => {
        message.channel.send(
          "<:delete:614100269369655306> Something went wrong..."
        );
      });;
    });
};
