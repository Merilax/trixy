const Mute = require('../../DB/modals/Mutes.js');
const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");
const { parseCommandTime } = require("../../utils/textParser.js");

module.exports.commanddata = {
    name: "mute",
    category: "moderation",
    cooldown: 2,
    args: true,
    guildOnly: true
};

module.exports.run = async (
    bot,
    message,
    args,
    prefix
) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageRoles))
        return message.channel.send({ content: `${TxTE.emoji.x} You do not have permissions to manage roles.` });

    let muteUser = message.mentions.members.first();
    if (!muteUser)
        return message.channel.send({ content: `${TxTE.emoji.quote} First, mention the user to mute.` });

    if (!message.guild.members.cache.find(m => m.user.id === muteUser.user.id))
        return message.channel.send({ content: `${TxTE.emoji.quote} Couldn't find member in cache.` });

    muteUser = message.guild.members.cache.find(m => m.user.id === muteUser.user.id);

    if (muteUser.user.id === message.author.id)
        return message.channel.send({ content: "Quite a peculiar request, is it not?" });

    if (muteUser.roles.highest.position >= message.member.roles.highest.position)
        return message.channel.send({ content: `${TxTE.emoji.x} You cannot mute members with the same or higher role as yours.` });

    let muteRole = message.guild.roles.cache.find(r => r.name === "Trixy Mute");
    if (!muteRole) {
        try {
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Trixy Mute",
                    color: "#000001",
                    position: message.guild.members.me.roles.highest.position - 1
                }
            });

            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.permissionOverwrites.edit(muteRole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
            message.channel.send({ content: `${TxTE.emoji.fix} I have created a Mute role, please check if its position is correct and working. Please do not change its name or I won't find it!` });
        } catch (e) {
            console.log(e);
            return message.channel.send({ content: `${TxTE.emoji.x} Could not create Mute role! Am I administrator?` });
        }
    }

    if (muteUser.roles.cache.has(muteRole.id))
        return message.channel.send({ content: `${TxTE.emoji.x} This user can't be any more silent.` });

    let time, multiplier, scale;
    try {
        [time, multiplier, scale] = parseCommandTime(remindTimeStr);
    } catch (error) {
        return message.channel.send({ content: `${TxTE.emoji.x} ${error.message}` });
    }

    muteExpire = Date.now() + (time * multiplier);

    try {
        const Mutes = await Mute.findOne({ userId: muteUser.user.id, guildId: message.guild.id });
        if (Mutes) {
            message.channel.send({ content: `${TxTE.emoji.x} This user is already muted in database, but didn't have a role. I'll asign it now.` });
        } else {
            await Mute.create({
                userId: muteUser.user.id,
                guildId: message.guild.id,
                username: muteUser.user.tag,
                duration: muteExpire
            });
        }

        await muteUser.roles.add(muteRole);
        message.channel.send({ content: `${TxTE.emoji.ok} User ${args[0]} has been succesfully muted for ${time} ${scale}.` });
    } catch (e) {
        console.log(e);
    }
};
