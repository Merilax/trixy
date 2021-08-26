const ytdl = require("ytdl-core");
const { Util } = require('discord.js');

module.exports.commanddata = {
  name: "play",
  aliases: ["p"],
  category: "music",
  cooldown: 3,
  args: true,
  guildOnly: true
};

module.exports.run = async (
  bot,
  message,
  args,
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  const voiceChannel = message.member.voice.channel;
  if (!voiceChannel) return message.channel.send('<:delete:614100269369655306> You have to be in a voice channel.');
  const permissions = voiceChannel.permissionsFor(bot.user);
  if (!permissions.has('CONNECT')) return message.channel.send('<:delete:614100269369655306> I cannot connect to your voice channel, please check my permissions.');
  if (!permissions.has('SPEAK')) return message.channel.send('<:delete:614100269369655306> I cannot speak in this voice channel, please check my permissions.');

  const serverQueue = queue.get(message.guild.id);
  const songInfo = await ytdl.getInfo(args[0].replace(/<(.+)>/g, '$1'));
  const song = {
    id: songInfo.videoDetails.videoID,
    title: Util.escapeMarkdown(songInfo.videoDetails.title),
    url: songInfo.videoDetails.video_url
  };

  if (serverQueue) {
    serverQueue.songs.push(song);
    //console.log(serverQueue.songs);
    return message.channel.send(`<:approve:614100268891504661> **${song.title}** has been added to the queue.`);
  }

  const queueConstruct = {
    textChannel: message.channel,
    voiceChannel: voiceChannel,
    connection: null,
    songs: [],
    volume: 2,
    playing: true
  };
  queue.set(message.guild.id, queueConstruct);
  queueConstruct.songs.push(song);

  const play = async song => {
    const serverQueue = queue.get(message.guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(message.guild.id);
      return;
    }

    const dispatcher = serverQueue.connection.play(ytdl(song.url))
      .on('finish', () => {
        serverQueue.songs.shift();
        play(serverQueue.songs[0]);
      })
      .on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`<:music:614100268950224912> Started playing: **${song.title}**`);
  };

  try {
    const connection = await voiceChannel.join();
    queueConstruct.connection = connection;
    play(queueConstruct.songs[0]);
  } catch (error) {
    console.error(`Could not join voice channel: ${error}`);
    serverQueue.delete(message.guild.id);
    await voiceChannel.leave();
    return message.channel.send(`Could not join voice channel: ${error}`);
  }
};
