const Discord = require("discord.js");

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
  txdev,
  prefix,
  faces_archive,
  queue
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
  var serverembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
    .setColor("BLUE")
    .addField(
      "<:user:614100269382238213> Server owner",
      message.guild.owner,
      true
    )
    .addField(
      "<:pin:614100269399277568> Server region",
      message.guild.region,
      true
    )
    .addField(
      "<:wired:614100269218791425> Verification level",
      message.guild.verificationLevel
    )
    .addField(
      "<:comment:614100269470449664> Channel count",
      message.guild.channels.cache.size,
      true
    )
    .addField(
      "<:database:614100269491421190> Roles count",
      message.guild.roles.cache.size,
      true
    )
    .addField(
      "<:bar_chart2:614100269306871819> Total member count",
      message.guild.memberCount
    )
    .addField(
      "<:user:614100269382238213> Humans",
      checkMembers(message.guild),
      true
    )
    .addField(
      "<:puzzle:614100269487226942> Bots",
      checkBots(message.guild),
      true
    )
    .setThumbnail(message.guild.iconURL())
    .setFooter("Use \"server roles\" to show a list of roles. Guild created at:")
    .setTimestamp(message.guild.createdAt);
  
  var roleembed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name}`, message.guild.iconURL())
    .setColor("BLUE")
    .addField("Roles are not in order.", message.guild.roles.cache.map(r => r.name).join("\n"))
  
  
  if (args[0] === "roles") {
    message.channel.send(roleembed);
  } else {
    message.channel.send(serverembed);
  }
};
