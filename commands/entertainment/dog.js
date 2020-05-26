const snekfetch = require("snekfetch");
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
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  snekfetch.get("https://dog.ceo/api/breeds/image/random").then(res => {
    var doggy = JSON.parse(res.raw);

    const embed = new Discord.RichEmbed()
      .setImage(doggy.message)
      .setTitle("Here you go! :dog:")
      .setColor("BLUE")
      .setFooter("https://dog.ceo/api/breeds/image/random");

    message.channel.send(embed);
  });
};