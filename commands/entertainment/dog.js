const nodefetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.commanddata = {
  name: "dog",
  aliases: ["puppy", "doggy", "doggo"],
  category: "entertainment",
  cooldown: 2,
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
  nodefetch("https://dog.ceo/api/breeds/image/random").then(res => res.json()).then(json => {

    const embed = new Discord.MessageEmbed()
      .setImage(json.message)
      .setTitle("Here you go! :dog:")
      .setColor("BLUE")
      .setFooter("https://dog.ceo/api/breeds/image/random");

    message.channel.send(embed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> Something went wrong..."
      );
    });;
  });
};