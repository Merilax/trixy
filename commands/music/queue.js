const Discord = require("discord.js");

module.exports.commanddata = {
    name: "queue",
    aliases: ["q"],
    category: "music",
    cooldown: 10,
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
    if (!serverQueue) return message.channel.send('<:delete:614100269369655306> There is nothing playing.');
    var embed = new Discord.MessageEmbed()
        .setTitle("<:music:614100268950224912> Song queue:")
        .setDescription(serverQueue.songs.map(song => `**-** ${song.title}`).join('\n'))
        .setColor("BLUE");
    return message.channel.send(embed);
};