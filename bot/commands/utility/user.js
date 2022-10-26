const Discord = require("discord.js");
const moment = require("moment");
const TxTE = require("../../TxTE.json");

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

  const member = message.guild.members.cache.get(user.id);

  const embed = new Discord.EmbedBuilder()
    .setColor("#4badeb")
    .setThumbnail(user.avatarURL())
    .addFields([
      { name: `${TxTE.emoji.user} User:`, value: `${user.tag}` },
      { name: `${TxTE.emoji.user} Id:`, value: `${user.id}` },
      { name: `${TxTE.emoji.comment} Nickname:`, value: `${member.nickname !== null ? `${member.nickname}` : "None"}` },
      { name: `${TxTE.emoji.quote} Custom Status:`, value: `${user.presence.activities[0] ? user.presence.activities[0].state : "None"}` },
      { name: `${TxTE.emoji.card} Activity:`, value: `${user.presence.activities[1] ? user.presence.activities[1].name : "None"}` },
      { name: `${TxTE.emoji.puzzle} Bot:`, value: `${user.bot}` },
      { name: `${TxTE.emoji.time} Joined The Server On:`, value: `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}` },
      { name: `${TxTE.emoji.time} Account Created On:`, value: `${moment.utc(user.createdAt).format("dddd, MMMM Do YYYY")}` },
      { name: `${TxTE.emoji.db} Roles:`, value: member.roles.cache.map(roles => `${roles}`).join(", ") }
    ])
    .setFooter({ text:`Replying to ${message.author.tag}` });
  message.channel.send({ embeds: [embed] });;
};
