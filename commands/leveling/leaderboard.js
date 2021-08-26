const Discord = require("discord.js");
const db = require('../../DB/db.js');

module.exports.commanddata = {
    name: "leaderboard",
    aliases: ['lb', 'levels'],
    category: "levels",
    cooldown: 10,
    guildOnly: true,
    args: false
};

module.exports.run = async (
    bot,
    message,
    args,
    ownerid,
    prefix,
    faces_archive,
    queue
) => {
    const xpenable = await db.XPEnabled.findOne({ where: { guild: message.guild.id } });
    if (xpenable.enabled == false) { return } else {
        const level = (await db.Levels.findAll({ attributes: ['user', 'level', 'xp'] }, { where: { guild: message.guild.id } }));

        let xplist = [];
        let lb = [];

        for (let i = 0; ; i++) {
            if (!level[i]) break;
            var element = level[i].dataValues;
            xplist.push(element);
        }

        xplist.sort((a, b) => b.level - a.level || b.xp - a.xp);

        for (let i = 0; i < 10; i++) {
            if (!xplist[i]) break;
            lb.push(`${xplist[i].user}\n**Level:** ${xplist[i].level} **XP:** ${xplist[i].xp}\n`);
        }
        
        const embed = new Discord.MessageEmbed()
            .setTitle(`**Leaderboard for** ${message.guild.name}`)
            .setDescription(lb)
            .setColor("BLUE")
            .setThumbnail(message.guild.iconURL())
            .setTimestamp(new Date());
        message.channel.send(embed);
    }
};