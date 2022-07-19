const Discord = require("discord.js");
const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "rewardlist",
    aliases: ["rlist", "rl"],
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
    await db.XPRewardType.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id, isCumulative: true } });
    const rewards = await db.XPRewards.findAll({ where: { guild: message.guild.id }});
    if(rewards == null) return message.channel.send({ content: `${TxTE.emoji.x} There are no role rewards set for this server.` })

    let rolelist = [];
    for (i = 0; ; i++) {
        if (!rewards[i]) break;
        rolelist.push(rewards[i].dataValues);
    };
    rolelist.sort((a, b) => a.level - b.level);
    
    let list = [];
    for (i = 0; i < rolelist.length; i++) {
        list.push(`LVL ${rolelist[i].level}: ${message.guild.roles.cache.find(r => r.id === rolelist[i].roleId)}`);
    };

    const embed = new Discord.EmbedBuilder()
        .setTitle("Here are all the rewards for the server:")
        .setDescription(list)
        .setColor("#4badeb");
    message.channel.send({ embeds: [embed] });
};