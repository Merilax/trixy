const db = require('../../DB/sequelDB.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
    name: "levelmention",
    aliases: ['lvlmention'],
    category: "levels",
    cooldown: 10,
    guildOnly: true,
    args: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    if (message.author.id !== message.guild.ownerId)
        return message.channel.send({ content: `${TxTE.emoji.block} Only the server owner may change this! Try \`overridemention\` to set your personal choice over this.` });

    await db.guildLevelConfigDB.findOrCreate({
        where: { guildId: message.guild.id },
        defaults: { guildId: message.guild.id, isCumulative: true }
    });

    if (args[0].trim().match(/^(true|false)$/i)) {
        let affirmation = TxTE.affirmation[Math.floor(Math.random() * TxTE.affirmation.length)];

        if (args[0] === "true") {
            await db.guildLevelConfigDB.update({ isCumulative: 1 }, {
                where: { guildId: message.guild.id }
            });
            message.channel.send({ content: `${TxTE.emoji.ok} ${affirmation} Members will be mentioned upon levelling up. Their user configuration will override this.` });
        } else {
            await db.guildLevelConfigDB.update({ isCumulative: 0 }, {
                where: { guildId: message.guild.id }
            });
            message.channel.send({ content: `${TxTE.emoji.ok} ${affirmation} Members won't be mentioned upon levelling up. Their user configuration will override this.` });
        }
    } else {
        message.channel.send({ content: `${TxTE.emoji.quote} Please specify \`true\` if you want members to be mentioned upon levelling up, or \`false\` otherwise.` });
    }
};