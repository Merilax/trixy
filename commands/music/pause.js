module.exports.commanddata = {
    name: "pause",
    category: "music",
    cooldown: 5,
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
    if (serverQueue && serverQueue.playing) {
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.pause();
        return message.channel.send('<:pause:614100269151813663> Pausing queue');
    }
    return message.channel.send('<:delete:614100269369655306> There is nothing playing.');
};