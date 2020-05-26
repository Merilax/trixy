const ytdl = require("ytdl-core");
const opus = require("opusscript");

module.exports.commanddata = {
  name: "leave",
  aliases: ["disconnect", "l"],
  category: "music",
  cooldown: 3,
  guildOnly: true,
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
  const serverQueue = queue.get(message.guild.id);

  serverQueue.connection.dispatcher.end();
  message.channel.send("Roger.");
  return;
};