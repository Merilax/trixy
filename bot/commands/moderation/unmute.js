const db = require('../../DB/sequelDB.js');
const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

module.exports.commanddata = {
  name: "unmute",
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
    return message.channel.send({ content: `${TxTE.emoji.quote} Specify an user to unmute.` });
  if (muteUser.user.id === message.author.id)
    return message.channel.send({ content: `How can you unmute yourself?` });
  if (muteUser.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send({ content: `${TxTE.emoji.x} You cannot unmute members with a higher or same role as yours.` });

  let txMuteRole = message.guild.roles.cache.find(r => r.name === "Trixy Mute");
  if (!txMuteRole) {
    try {
      txMuteRole = await message.guild.roles.create({
        data: {
          name: "Trixy Mute",
          color: "#000001",
          position: self.roles.highest.position - 1
        }
      });

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.permissionOverwrites.edit(txMuteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      return message.channel.send({ content: `${TxTE.emoji.fix} I have created a Mute role, please check if its position is correct and working. Please do not change its name or I won't find it!` });
    } catch (e) {
      console.log(e);
      return message.channel.send({ content: `${TxTE.emoji.x} Could not create Mute role! Am I administrator?` });
    }
  }

  if (muteUser.roles.cache.has(txMuteRole.id) === false) {
    return message.channel.send({ content: `${TxTE.emoji.x} This user can't be any louder.` })
  } 

  try {
    await db.Mutes.destroy({ where: { guildId: message.guild.id, userId: muteUser.user.id } });
    await muteUser.roles.remove(txMuteRole);
    message.channel.send({ content: `${TxTE.emoji.ok} User ${args[0]} has been succesfully unmuted.` });
  } catch (e) {
    console.log(e);
  }
};
