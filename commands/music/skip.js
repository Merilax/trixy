const ytdl = require("ytdl-core");
const opus = require("opusscript");

module.exports.commanddata = {
  name: "skip",
  aliases: ["s"],
  category: "music",
  cooldown: 3,
  args: false,
  guildOnly: true
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

  function skip(message, serverQueue) {
    if (!message.member.voiceChannel)
      return message.channel.send("You have to be in a voice channel.");
    if (!serverQueue)
      return message.channel.send("There are no songs to skip.");
    serverQueue.connection.dispatcher.end();
  }

  skip(message, serverQueue);
  return;
};