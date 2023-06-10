const Discord = require("discord.js");
const helplist = require('./helplist.json');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
  name: "help",
  aliases: ["commands", "cmds"],
  category: "system",
  cooldown: 2,
  guildOnly: false,
  args: false
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  if (args[0]) {
    var advhelp = args[0];
    var help = helplist[advhelp];

    if (help) {
      var helpembed = new Discord.EmbedBuilder()
        .setTitle(`${TxTE.emoji.settings} **${help.t}**`)
        .setDescription(help.d)
        .setFooter({ text: `Usage: ${help.u}` })
        .setColor("#4badeb");

      return message.author.send({ embeds: [helpembed] }).catch(error => {
        message.channel.send({ content: `${TxTE.emoji.x} It seems like I can't DM you! I'll post the message here instead...\n` });
        message.channel.send({ embeds: [helpembed] });
      });
    } else {
      return message.channel.send({ content: `${TxTE.emoji.x} That does not look like a command I would know. Try not to use aliases, only the full command name.` });
    }
  } else {
    var helpembed = new Discord.EmbedBuilder()
      .setTitle(
        `${TxTE.emoji.settings} **I'd love to help! Listing all commands:**`
      )
      .setDescription(
        "Need help? [Join the support server!](https://discord.gg/ZbUQ8Mh)\nPut a command after `Trixy, help` for more info about it.\nHave you seen our new website? Check it out [here](https://trixy-v2.herokuapp.com)!"
      )
      .addFields([
        {
          name: "**System and information:**",
          value: "```md\n# help, invite, levelsystem, suggest, ping, prefix, usercolour.```"
        },
        {
          name: "**Moderation and server management:**",
          value: "```md\n# prune, kick, ban, mute, addrole, removerole, mute, unmute.```"
        },
        {
          name: "**Miscellaneous and entertainment:**",
          value: "```md\n# bird, cat, cosmos, dog, fact, fox, roll.```"
        },
        {
          name: "**Utility:**",
          value: "```md\n# avatar, remindme, server, user, weather.```"
        },
        {
          name: "**Leveling:**",
          value: "```md\n# addreward, leaderboard, level, levelchannel, leveldelete, levelmention, mentionoverride, removereward, rewardlist, rewardtype.```"
        }
      ])
      .setThumbnail("https://media.discordapp.net/attachments/356840100749115395/613738957154418708/1563964604683.png?width=702&height=702")
      .setFooter({ text: "Icons by https://dryicons.com" })
      .setColor("#4badeb")
      .setTimestamp(new Date());

    return message.author.send({ embeds: [helpembed] }).catch(error => {
      message.channel.send({ content: `${TxTE.emoji.x} It seems like I can't DM you! I'll post the message here instead...\n` });
      message.channel.send({ embeds: [helpembed] });
    });
  };
}