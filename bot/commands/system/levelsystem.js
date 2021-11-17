const db = require('../../DB/sequelDB.js');

module.exports.commanddata = {
    name: "levelsystem",
    aliases: ['xpsystem', 'xpsys', 'lvlsys'],
    category: "system",
    cooldown: 5,
    guildOnly: true,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    if (message.author.id !== message.guild.ownerID) {
        return message.channel.send("<:block:614100269004881924> Only the server owner may modify the leveling system!");
    } else {
        if (args[0] === "enable") {
            await db.XPEnabled.update({ enabled: 1 }, { where: { guild: message.guild.id } });
            return message.channel.send("<:approve:614100268891504661> **Enabled** leveling system!");
        } else if (args[0] === "disable") {
            await db.XPEnabled.update({ enabled: 0 }, { where: { guild: message.guild.id } });
            return message.channel.send("<:approve:614100268891504661> **Disabled** leveling system!");
        } else {
            return message.channel.send("<:quote:614100269386432526> You must append `enable` or `disable` to the command in order to enable or disable the leveling system.");
        }
    }
};