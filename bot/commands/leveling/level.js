const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const PersonalCard = require('../../DB/modals/PersonalCard');
const GuildCard = require('../../DB/modals/GuildCard');
const Canvas = require('canvas');

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
    prefix
) => {
    const [xpenable, xpCreated] = await db.XPEnabled.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id } });
    if (xpenable.enabled === false) { return }

    if (!args[0]) {
        var user = message.author;
    } else {
        var user = message.mentions.members.first().user;
    };

    const level = await db.Levels.findOne({ where: { guild: message.guild.id, userId: user.id } });
    const userColor = await PersonalCard.findOne({ discordId: user.id });
    const guildColor = await GuildCard.findOne({ discordId: user.id });
    let cardColor;
    
    if (level === null) {
        return message.channel.send("<:delete:614100269369655306> No XP gained yet.");
    }

    if (userColor === null) {
        if (guildColor === null) { cardColor = '#08f'; }
        else { cardColor = guildColor.color; }
    } else { cardColor = userColor.color; }

    const xpLimit = (level.level * 100 + 100);
    const progressBar = ((level.xp / xpLimit) * 950);
    const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
    const canvas = Canvas.createCanvas(950, 280);
    const ctx = canvas.getContext('2d');

    // Progress bg arrow
    ctx.fillStyle = cardColor;
    ctx.fillRect(0, 0, progressBar, 280);
    ctx.save();
    ctx.moveTo(progressBar-1, 0);
    ctx.lineTo(progressBar, 0);
    ctx.lineTo(progressBar+50, 140);
    ctx.lineTo(progressBar, 280);
    ctx.lineTo(progressBar-1, 280);
    ctx.lineTo(progressBar, 0);
    ctx.clip();
    ctx.fill();
    ctx.restore();

    // XP
    ctx.save();
    ctx.fillStyle = '#333';
    ctx.fillRect(0, 80, canvas.width, 120);
    ctx.fillStyle = '#eee';
    ctx.font = '50px arial';
    ctx.fillText(`${level.xp} / ${xpLimit} XP`, 550, 160, 365);
    ctx.restore();

    // Name and Level
    ctx.save();
    ctx.moveTo(0,50);
    ctx.beginPath();
    ctx.lineTo(500,50);
    ctx.lineTo(530,140);
    ctx.lineTo(500,230);
    ctx.lineTo(0,230);
    ctx.lineTo(0,50);
    ctx.closePath();
    ctx.clip();
    ctx.fillStyle = '#444';
    ctx.fill();
    ctx.font = '30px arial';
    ctx.fillStyle = '#eee';
    ctx.fillText(user.tag.toUpperCase(), 220, 110, 280);
    ctx.fillText(`LEVEL ${level.level}`, 220, 190, 280);
    ctx.fillStyle = cardColor;
    ctx.moveTo(225, 135);
    ctx.beginPath();
    ctx.lineTo(475, 135);
    ctx.quadraticCurveTo(480, 135, 480, 140);
    ctx.quadraticCurveTo(480, 145, 470, 145);
    ctx.lineTo(225, 145);
    ctx.quadraticCurveTo(220, 145, 220, 140);
    ctx.quadraticCurveTo(220, 135, 230, 135);
    ctx.closePath();
    ctx.clip();
    ctx.fill();
    ctx.restore();

    // Avatar
	ctx.beginPath();
	ctx.arc(115, 140, 75, 0, Math.PI * 2, true);
    ctx.closePath();
	ctx.clip();
    ctx.drawImage(avatar, 40, 65, 150, 150);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'level.png');
    message.channel.send({ files: [attachment] });
};