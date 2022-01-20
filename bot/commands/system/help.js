const Discord = require("discord.js");
const helplist = require('./helplist.json');


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
      var helpembed = new Discord.MessageEmbed()
        .addField(`<:settings:614100269004750898> **${help.t}**`, help.d)
        .setFooter("Usage: " + help.u)
        .setColor("BLUE");

      return message.author.send(helpembed).catch(error => {
        message.channel.send("<:delete:614100269369655306> It seems like I can't DM you! I'll post the message here instead...\n");
        message.channel.send(helpembed);
      });
    } else {
      return message.channel.send("<:delete:614100269369655306> That does not look like a command I would know. Try not to use aliases, only the full command name.");
    }
  } else {
    var helpembed = new Discord.MessageEmbed()
      .setTitle(
        "<:settings:614100269004750898> **I'd love to help! Listing all commands:**"
      )
      .setDescription(
        "Need help? [Join the support server!](https://discord.gg/ZbUQ8Mh)\nPut a command after `Trixy, help` for more info about it.\nHave you seen our new website? Check it out [here](https://trixy-v2.herokuapp.com)!"
      )
      .addField(
        "**System and information:**",
        "```md\n# help, invite, levelsystem, suggest, ping, prefix, usercolour.```"
      )
      .addField(
        "**Moderation and server management:**",
        "```md\n# prune, kick, ban, mute, addrole, removerole, mute, unmute.```"
      )
      .addField(
        "**Miscellaneous and entertainment:**",
        "```md\n# bird, cat, cosmos, dog, fact, fox, roll.```"
      )
      .addField(
        "**Utility:**",
        "```md\n# avatar, remindme, server, user, weather.```"
      )
      .addField(
        "**Leveling:**",
        "```md\n# addreward, leaderboard, level, leveldelete, removereward, rewardlist, rewardtype.```"
      )
      .setThumbnail("https://media.discordapp.net/attachments/356840100749115395/613738957154418708/1563964604683.png?width=702&height=702")
      .setFooter("Icons by https://dryicons.com")
      .setColor("BLUE")
      .setTimestamp(new Date());

    return message.author.send(helpembed).catch(error => {
      message.channel.send("<:delete:614100269369655306> It seems like I can't DM you! I'll post the message here instead...\n");
      message.channel.send(helpembed);
    });
  };
}