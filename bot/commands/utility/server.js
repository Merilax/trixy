const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
  name: "server",
  aliases: ["serverinfo"],
  category: "utility",
  cooldown: 5,
  guildOnly: true,
  args: false
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  function checkBots(guild) {
    let botCount = 0;
    guild.members.cache.forEach(member => {
      if (member.user.bot) botCount++;
    });
    return botCount;
  }
  function checkMembers(guild) {
    let memberCount = 0;
    guild.members.cache.forEach(member => {
      if (!member.user.bot) memberCount++;
    });
    return memberCount;
  }
  var serverembed = new Discord.EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()})
    .setColor("#4badeb")
    .addFields([
      { bame: `${TxTE.emoji.user} ID`, value: `${message.guild.id}`},
      { name: `${TxTE.emoji.user} Server owner`, value: `${message.guild.members.cache.get(message.guild.ownerId).user.tag}` },
      { name: `${TxTE.emoji.network} Verification level`, value: `${message.guild.verificationLevel}` },
      { name: `${TxTE.emoji.comment} Channel count`, value: `${message.guild.channels.cache.size}` },
      { name: `${TxTE.emoji.db} Roles count`, value: `${message.guild.roles.cache.size}` },
      { name: `${TxTE.emoji.chart} Total member count`, value: `${message.guild.memberCount}` },
      { name: `${TxTE.emoji.user} Humans`, value: `${checkMembers(message.guild)}` },
      { name: `${TxTE.emoji.puzzle} Bots`, value: `${checkBots(message.guild)}` }
    ])
    .setThumbnail(message.guild.iconURL())
    .setFooter({ text:`Use command \`server roles\` to show a list of roles. Guild created at:` })
    .setTimestamp(message.guild.createdAt);

  var roleembed = new Discord.EmbedBuilder()
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL()})
    .setColor("#4badeb")
    .setTitle("Roles are not in order.")
    .setDescription(message.guild.roles.cache.map(r => r.name).join("\n"))

  if (args[0] === "roles") {
    message.channel.send({ embeds: [roleembed] });
  } else {
    message.channel.send({ embeds: [serverembed] });
  }
};
