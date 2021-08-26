const fs = require("fs");

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
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send(
      "<:delete:614100269369655306> You do not have permissions to manage roles."
    );

  let toMute =
    message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!toMute)
    return message.channel.send(
      "<:quote:614100269386432526> Specify an user to unmute."
    );

  if (toMute.id === message.author.id)
    return message.channel.send("How can you unmute yourself?");
  if (toMute.roles.cache.highest.position >= message.member.roles.cache.highest.position)
    return message.channel.send(
      "<:delete:614100269369655306> You cannot unmute members with a higher or same role."
    );

  let role = message.guild.roles.cache.cache.find(r => r.name === "Trixy Mute");
  if (!role) {
    try {
      role = await message.guild.roles.cache.create({
        name: "Trixy Mute",
        color: "#000001",
        permission: []
      });

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.overwritePermissions(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e);
    }
  }

  if (!role || !toMute.roles.cache.has(role.id))
    return message.channel.send(
      "<:delete:614100269369655306> This user can't be any louder."
    );

  await toMute.roles.cache.remove(role);

  delete bot.mutes[toMute.id];

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
    if (err) throw err;
    message.channel.send(
      `<:approve:614100268891504661> I have unmuted <@${toMute.user.id}>.`
    );
  });
};
