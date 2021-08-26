module.exports.commanddata = {
    name: "resume",
    category: "music",
    cooldown: 5,
    guildOnly: true,
    args: false
};

module.exports.run = (
    bot,
    message,
    args,
    txdev,
    prefix,
    faces_archive,
    queue
) => {
    const serverQueue = queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
        return message.channel.send('<:play:614100269419986944> Resuming queue.');
    }
    return message.channel.send('<:delete:614100269369655306> There is nothing playing.');
};