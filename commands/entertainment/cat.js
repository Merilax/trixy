const nodefetch = require("node-fetch");
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
  nodefetch("https://aws.random.cat/meow").then(res => res.json()).then(json => {
    const embed = new Discord.MessageEmbed()
      .setImage(json.file)
      .setTitle("Here you go! :cat:")
      .setColor("BLUE")
      .setFooter("https://aws.random.cat/meow");
    return message.channel.send(embed)
      .catch(error => {
        message.channel.send(
          "<:delete:614100269369655306> Something went wrong..."
        );
      });
  });
};