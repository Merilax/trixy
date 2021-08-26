const Discord = require("discord.js");
const db = require('../../DB/db.js');

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
    faces_archive,
    queue
) => {
    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.members.first().user;
    };
    const level = await db.Levels.findOne({ where: { guild: message.guild.id, userId: user.id } });

    if (level == null) {
        try {
            await db.Levels.create({
                user: user.tag,
                userId: user.id,
                guild: message.guild.id,
                xp: 0,
            });
            return (message.channel.send("<:delete:614100269369655306> This user has not yet sent a message here! Creating a profile for them now."));
        } catch (err) {
            console.log(`Could not create XP entry for user ${message.author.username}`);
        }
    } else {
        const embed = new Discord.MessageEmbed()
            .setTitle(`**${user.tag}**`)
            .setDescription(`**LEVEL: ${level.level}\nXP: [ ${level.xp} / ${(level.level * 100 + 100)} ]**`)
            .setColor("BLUE")
            .setThumbnail(user.avatarURL())
            .setTimestamp(new Date());
        message.channel.send(embed);
    }
};