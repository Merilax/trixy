const bot = require("../../bot/bot.js");

function getMutualGuilds(userGuilds) {
    let botGuilds = bot.guilds.getBotGuilds();
    return userGuilds.filter((guild) => botGuilds.find((botGuild) => botGuild.id === guild.id));// && (guild.permissions & 0x8) === 0x8 PERMISSION CHECK
}
module.exports = { getMutualGuilds }