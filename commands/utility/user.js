const Discord = require("discord.js");
const moment = require("moment");

module.exports.commanddata = {
  name: "user",
  aliases: ["userinfo", "whois"],
  category: "utility",
  cooldown: 2,
  args: false,
  guildOnly: true
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  let user;
  if (message.mentions.users.first()) {
    user = message.mentions.users.first();
  } else {
    user = message.author;
  }

  const member = message.guild.member(user);
  const userStatus = {
    online: "Online",
    idle: "Idle",
    dnd: "Do not disturb",
    offline: "Offline"
  }

  const embed = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setThumbnail(user.avatarURL())
    .addField("<:user:614100269382238213> User:", `${user}#${user.discriminator}`, true)
    .addField("<:user:614100269382238213> ID:", `${user.id}`, true)
    .addField(
      "<:comment:614100269470449664> Nickname:",
      `${member.nickname !== null ? `${member.nickname}` : "None"}`,
      true
    )
    .addField(
      "<:quote:614100269386432526> Status:",
      `${userStatus[user.presence.status]}`,
      true
    )
    .addField("<:home:614100269596409869> In Server", message.guild.name, true)
    .addField(
      "<:quote:614100269386432526> Custom Status:",
      `${user.presence.activities[0] ? user.presence.activities[0].state : "None"}`,
      true
    )
    .addField(
      "<:card:614100269344489472> Activity:",
      `${user.presence.activities[1] ? user.presence.activities[1].name : "None"}`,
      true
    )
    .addField("<:puzzle:614100269487226942> Bot:", `${user.bot}`, true)
    .addField(
      "<:hourglass2:614100269332037662> Joined The Server On:",
      `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`,
      true
    )
    .addField(
      "<:hourglass2:614100269332037662> Account Created On:",
      `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}`,
      true
    )
    .addField(
      "<:database:614100269491421190> Roles:",
      member.roles.cache.map(roles => `${roles}`).join(", "),
      true
    )
    .setFooter(
      `Replying to ${message.author.tag}`
    );
  message.channel.send(embed);
};
