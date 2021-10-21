module.exports.commanddata = {
    name: "shutdown",
    alias: ['poweroff', 'crash', 'destroy'],
    cooldown: 10,
    args: false,
    guildOnly: false,
    category: "dev_only"
};

module.exports.run = (
    bot,
    message,
    args,
    prefix
) => {
    bot.destroy();
};