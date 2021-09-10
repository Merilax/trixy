const fs = require("fs");
const db = require('../../DB/db.js');

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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      "<:delete:614100269369655306> You do not have permissions to manage roles."
    );

  let muteUser = message.mentions.members.first();
  if (!muteUser)
    return message.channel.send(
      "<:quote:614100269386432526> Specify an user to unmute."
    );
  if (muteUser.id === message.author.id)
    return message.channel.send("How can you unmute yourself?");
  if (muteUser.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send(
      "<:delete:614100269369655306> You cannot unmute members with a higher or same role as yours."
    );

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
        await channel.updateOverwrite(txMuteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      return message.channel.send("<:fix:614100269449347082> I have created a Mute role, please check if its position is correct and working. Please do not change its name or I won't find it!");
    } catch (e) {
      console.log(e);
      return message.channel.send("<:delete:614100269369655306> Could not create Mute role! Am I administrator?");
    }
  }

  if (!muteUser.roles.cache.has(txMuteRole.id))
    return message.channel.send(
      "<:delete:614100269369655306> This user can't be any louder."
    );

    try {
      await db.Mutes.destroy({ where: { guildId: message.guild.id, userId: muteUser.user.id } });
      await muteUser.roles.remove(txMuteRole);
      message.channel.send(
        `<:approve:614100268891504661> User ${args[0]} has been succesfully unmuted.`
      );
    } catch (e) {
      console.log(e);
    }
};
