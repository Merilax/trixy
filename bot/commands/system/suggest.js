const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");
const config = require("../../config.json");

module.exports.commanddata = {
    name: "suggest",
    aliases: ["suggestion"],
    category: "system",
    cooldown: 5,
    guildOnly: false,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    var embed = new Discord.EmbedBuilder()
        .setTitle("A new suggestion has arrived!")
        .setDescription(args.join(" "))
        .setColor("#4badeb")
        .setFooter(message.author.tag + " / " + message.author.id);
    const channel = await bot.channels.cache.find(ch => ch.id === config.suggestionChannel);
    channel.send(embed);
    message.channel.send({ content: `${TxTE.emoji.ok} Suggestion sent, thank you!` })
};
