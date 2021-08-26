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
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) return message.channel.send('<:delete:614100269369655306> You have to be in a voice channel.');
  const serverQueue = queue.get(message.guild.id);
  if (!serverQueue) return message.channel.send('<:delete:614100269369655306> There are no songs to skip.');
  serverQueue.songs = [];
  serverQueue.connection.dispatcher.end('<:trash:614100269340426242> Queue cleared.');
};
