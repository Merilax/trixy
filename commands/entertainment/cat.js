const snekfetch = require("snekfetch");
const Discord = require("discord.js");

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
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  snekfetch.get("https://aws.random.cat/meow").then(res => {
    const embed = new Discord.RichEmbed()
      .setImage(res.body.file)
      .setTitle("Here you go! :cat:")
      .setColor("BLUE")
      .setFooter("https://aws.random.cat/meow");
    return message.channel.send(embed);
  });
};