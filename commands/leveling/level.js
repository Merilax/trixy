const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const PersonalCard = require('../../DB/modals/PersonalCard');
const GuildCard = require('../../DB/modals/GuildCard');

module.exports.commanddata = {
    name: "level",
    aliases: ['rank', 'lvl', 'xp'],
    category: "levels",
    cooldown: 5,
    guildOnly: true,
    args: false
};

module.exports.run = async (
    bot,
    message,
    args,
    txdev,
    prefix,
    faces_archive
) => {
    const [xpenable, xpCreated] = await db.XPEnabled.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id } });
    if (xpenable.enabled == false) { return }

    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.members.first().user;
    };

    const level = await db.Levels.findOne({ where: { guild: message.guild.id, userId: user.id } });
    const userColor = await PersonalCard.findOne({ discordId: user.id });
    const guildColor = await GuildCard.findOne({ discordId: user.id });
    let embedColor;

    if (level === null) {
        return message.channel.send("<:delete:614100269369655306> No XP gained yet.");
    }

    if (userColor == null) {
        if (guildColor == null) { embedColor = "BLUE"; }
        else { embedColor = guildColor.color; }
    } else { embedColor = userColor.color; }

    const embed = new Discord.MessageEmbed()
        .setTitle(`**${level.tag}**`)
        .setDescription(`**LEVEL: ${level.level}\nXP: [ ${level.xp} / ${(level.level * 100 + 100)} ]**`)
        .setColor(embedColor)
        .setThumbnail(user.avatarURL())
        .setTimestamp(new Date());
    message.channel.send(embed);
};