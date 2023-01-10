const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const Canvas = require('canvas');

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
    prefix
) => {
    const xpenable = await db.guildConfigDB.findOne({ where: { guildId: message.guild.id } });
    if (xpenable.xpEnabled == false) { return } else {
        const level = await db.Levels.findAll({ where: { guild: message.guild.id } });
        const guildConfig = await db.guildConfigDB.findOne({ where: { guildId: message.guild.id } });

        let xplist = [];
        let barColor;

        if (guildConfig === null) { barColor = '#0088ff'; }
        else if (guildConfig.color === null) { barColor = '#0088ff'; }
        else { barColor = guildConfig.color; }

        for (let i = 0; ; i++) {
            if (!level[i]) break;
            var element = level[i].dataValues;
            xplist.push(element);
        }

        xplist.sort((a, b) => b.level - a.level || b.xp - a.xp);

        const canvas = Canvas.createCanvas(800, 990);
        const ctx = canvas.getContext('2d');

        for (let i = 0; i < 10; i++) {
            if (!xplist[i]) break;
            const xpLimit = (xplist[i].level * 100 + 100);
            const progressBar = ((xplist[i].xp / xpLimit) * 800);
            var splitSpace = i * 100;

            try { lbUser = message.guild.members.cache.find(m => m.user.id === xplist[i].userId).user.tag }
            catch (e) { lbUser = xplist[i].user }

            ctx.fillStyle = '#333';
            ctx.fillRect(0, splitSpace, canvas.width, 75);
            ctx.fillStyle = barColor;
            ctx.fillRect(0, splitSpace + 75, progressBar, 15);
            ctx.fillStyle = '#666';
            ctx.fillRect(0, splitSpace, 75, 75);


            try {
                const avatar = await Canvas.loadImage(
                    message.guild.members.cache.find(
                        m => m.user.id === xplist[i].userId)
                        .user.displayAvatarURL({ extension: 'jpg' }));
                ctx.drawImage(avatar, 0, splitSpace, 75, 75);
            } catch (e) {
                const nouser = new Canvas.Image();
                nouser.onload = () => ctx.drawImage(nouser, 0, splitSpace, 75, 75);
                nouser.onerror = err => { };
                nouser.src = './dashboard-frontend/public/media/nouser.png'; //https://media.discordapp.net/attachments/356840100749115395/914263159836114964/nouser.png
            }

            switch (i) {
                case 0: ctx.fillStyle = '#d4af37'; break;
                case 1: ctx.fillStyle = '#b3c2cb'; break;
                case 2: ctx.fillStyle = '#a97142'; break;
                default: ctx.fillStyle = '#888';
            }
            ctx.fillRect(725, splitSpace, 75, 75);
            ctx.font = '40px arial';
            ctx.fillStyle = '#222';
            if (i === 9) { ctx.fillText(`#10`, 729, splitSpace + 52) }
            else { ctx.fillText(`#${i + 1}`, 740, splitSpace + 52) }
            ctx.font = '35 px arial';
            ctx.fillStyle = '#ddd';
            ctx.fillText(xplist[i].user, 90, splitSpace + 51, 465);
            ctx.fillText(`LVL ${xplist[i].level}`, 580, splitSpace + 51, 130);
        }

        const attachment = new Discord.AttachmentBuilder(canvas.toBuffer(), { name: 'leaderboard.png' });
        const embed = new Discord.EmbedBuilder()
            .setTitle(`**Leaderboard for** ${message.guild.name}`)
            .setImage('attachment://leaderboard.png')
            .setColor(barColor)
            .setTimestamp(new Date());
        message.channel.send({ embeds: [embed], files: [attachment] });
    }
};