const ytdl = require("ytdl-core");
const opus = require("opusscript");

module.exports.commanddata = {
  name: "play",
  aliases: ["p"],
  category: "music",
  cooldown: 3,
  args: true,
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
  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }
  if (validURL(args) === false)
    return message.channel.send(
      "<:delete:614100269369655306> Song must come in URL format from YouTube only."
    );
  const URLstring = args.toString();
  const serverQueue = queue.get(message.guild.id);

  async function execute(message, serverQueue) {
    const voiceChannel = message.member.voiceChannel;
    if (!voiceChannel)
      return message.channel.send("You must be in a voice channel.");
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return message.channel.send(
        "I have no permission to control the voice channel."
      );
    }

    const songInfo = await ytdl.getInfo(URLstring);
    const song = {
      title: songInfo.title,
      url: songInfo.video_url
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        message.reply("Something went wrong...");
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      serverQueue.songs.push(song);
      console.log(serverQueue.songs);
      return message.channel.send(
        `**${song.title}** has been added to the queue.`
      );
    }
  }

  function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }

    const dispatcher = serverQueue.connection
      .playStream(ytdl(song.url))
      .on("end", () => {
        console.log("Song ended");
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on("error", error => {
        console.error(error);
      });
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  }

  try {
    execute(message, serverQueue);
  } catch (error) {
    console.log(error);
    message.channel.send(
      "<:delete:614100269369655306> Something went wrong..."
    );
  }
  return;
};
