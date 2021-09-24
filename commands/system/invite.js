const Discord = require("discord.js");

module.exports.commanddata = {
  name: "invite",
  category: "system",
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
  faces_archive
) => {
  message.author
    .send(
      "https://discordapp.com/api/oauth2/authorize?client_id=583006737322475550&permissions=8&scope=bot"
    )
    .catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
};