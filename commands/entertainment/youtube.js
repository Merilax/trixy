const Discord = require("discord.js");

module.exports.commanddata = {
  name: "youtube",
  aliases: ["comment", "yt"],
  category: "entertainment",
  args: true,
  guildOnly: false,
  cooldown: 2
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
  if (!args.length)
    return message.channel.send(
      `<:quote:614100269386432526> Please provide something to comment.`
    );
  if (args.join(" ").length >= 76)
    return message.channel.send(
      `<:quote:614100269386432526> Your comment must be less than 76 characters long.`
    );

  var auth = message.mentions.members.first();
  
  if (!auth) {
    var user = message.author;
    var coms = args;
  } else {
    var user = auth.user;
    var coms = args.slice(1).join(" ");
  }
  
  const pic = `https://some-random-api.ml/beta/youtube-comment?username=${
    user.username
  }&comment=${encodeURIComponent(coms)}&avatar=${
    user.displayAvatarURL
  }`;
  
  const comment = new Discord.RichEmbed()
    .setTitle(`Well, ${user.username} once said...`)
    .setDescription("[Not showing up?]("+pic+")")
    .setImage(pic)
    .setColor("BLUE");
  message.channel.send(comment).catch(error => {});
};