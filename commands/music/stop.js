const ytdl = require("ytdl-core");
const opus = require("opusscript");

module.exports.commanddata = {
  name: "stop",
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

  function stop(message, serverQueue) {
    if (!message.member.voiceChannel)
      return message.channel.send(
        "You have to be in a voice channel to stop the music."
      );
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
  }

  stop(message, serverQueue);
  return;
};
