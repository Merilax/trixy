module.exports.commanddata = {
    name: "np",
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
    if (!serverQueue) return message.channel.send('<:delete:614100269369655306> There is nothing playing.');
    return message.channel.send(`<:music:614100268950224912> Now playing: **${serverQueue.songs[0].title}**`);
};