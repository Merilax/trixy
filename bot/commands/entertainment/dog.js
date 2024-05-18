const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "dog",
    aliases: ["puppy", "doggy", "doggo"],
    category: "entertainment",
    cooldown: 2,
    guildOnly: false,
    args: false
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json()).then(json => {

        const embed = new Discord.EmbedBuilder()
            .setImage(json.message)
            .setTitle("Here you go! :dog:")
            .setColor("#4badeb")
            .setFooter({ text: "https://dog.ceo/api/breeds/image/random" });

        message.channel.send({ embeds: [embed] })
            .catch(err => {
                message.channel.send(`${TxTE.emoji.x} Something went wrong...`);
            });;
    });
};