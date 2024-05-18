const Mute = require('../../DB/modals/Mutes.js');
const config = require('../../config.json');
const { PermissionsBitField } = require('discord.js');
const TxTE = require("../../TxTE.json");

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

  //return console.log(message.mentions.members.first().user.id);
  let muteUser = message.mentions.members.first(); //args[0].slice(3,-1); What is this?
  if (!muteUser) return message.channel.send({ content: `${TxTE.emoji.quote} First, mention the user to mute.` });
  if (!message.guild.members.cache.find(m => m.user.id === muteUser.user.id)) {
    return message.channel.send({ content: `${TxTE.emoji.quote} Couldn't find member in cache.` })
  } else {
    muteUser = message.guild.members.cache.find(m => m.user.id === muteUser.user.id);
  }
  if (muteUser.user.id === config.ownerID) return;

  if (muteUser.user.id === message.author.id)
    return message.channel.send({ content: "Quite a peculiar petition, is it not?" });
  if (muteUser.roles.highest.position >= message.member.roles.highest.position) {
    return message.channel.send({ content: `${TxTE.emoji.x} You cannot mute members with the same or higher role as yours.` });
  }

  let txMuteRole = message.guild.roles.cache.find(r => r.name === "Trixy Mute");
  if (!txMuteRole) {
    try {
      txMuteRole = await message.guild.roles.create({
        data: {
          name: "Trixy Mute",
          color: "#000001",
          position: message.guild.members.me.roles.highest.position - 1
        }
      });

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.permissionOverwrites.edit(txMuteRole, {
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

  if (muteUser.roles.cache.has(txMuteRole.id)) {
    return message.channel.send({ content: `${TxTE.emoji.x} This user can't be any more silent.` });
  }
  
  let remindTimeStr = args[1];
  let maxTime; let timeScale; let multiplier;
  let remindTimeInt;
  switch (remindTimeStr.toLowerCase().slice(-1)) {
    case "h":
      remindTimeInt = remindTimeStr.slice(0, -1)
      maxTime = 8760;
      timeScale = 'hours';
      multiplier = 3600000; //ms to h
      break;
    case "m":
      remindTimeInt = remindTimeStr.slice(0, -1)
      maxTime = 525600;
      timeScale = 'minutes';
      multiplier = 60000; //ms to m
      break;
  }

  let remindThen;

  if (args[1] && (args[1] < 1000000) && (args[1] > 0)) {
    var muteExpire = Date.now() + (parseInt(args[1]) * 60000);
  } else {
    var muteExpire = 0;
  }

  try {
    const Mutes = await Mute.findOne({ userId: muteUser.user.id, guildId: message.guild.id });
    if (Mutes) {
      message.channel.send({ content: `${TxTE.emoji.x} This user is already muted in database.` });
    } else {
      await Mute.create({
        userId: muteUser.user.id,
        guildId: message.guild.id,
        username: muteUser.user.tag,
        duration: muteExpire
      });
    }
    await muteUser.roles.add(txMuteRole);
    message.channel.send({ content: `${TxTE.emoji.ok} User ${args[0]} has been succesfully muted for ${args[1]} minutes.` });
  } catch (e) {
    console.log(e);
  }
};
