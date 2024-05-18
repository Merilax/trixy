const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "fact",
    category: "entertainment",
    cooldown: 3,
    guildOnly: false,
    args: false
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then(res => res.json()).then(json => {

            var embed = new Discord.EmbedBuilder()
                .setTitle("Did you know...")
                .setDescription(json.text)
                .setColor("#4badeb")
                .setFooter({ text: "uselessfacts.jsph.pl" });

            message.channel.send({ embeds: [embed] })
                .catch(err => {
                    message.channel.send(`${emoji.x} Something went wrong...`);
                });;
        });
};
