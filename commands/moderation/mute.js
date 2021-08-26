const fs = require("fs");

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
      "<:quote:614100269386432526> Specify an user to mute."
    );
  if (toMute.id === ownerid) return;

  if (toMute.id === message.author.id)
    return message.channel.send("Your voice isn't that annoying.");
  if (toMute.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send(
      "<:delete:614100269369655306> You cannot mute members with a higher or same role."
    );

  let role = message.guild.roles.cache.find(r => r.name === "Trixy Mute");
  if (!role) {
    try {
      role = await message.guild.roles.create({
        name: "Trixy Mute",
        color: "#000001",
        permission: []
      });

      message.guild.channels.cache.forEach(async (channel, id) => {
        await channel.permissionOverwrites.update(role, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      return message.channel.send(
        "<:delete:614100269369655306> Because Discord is so cool, now that I have created a new role you should put it above the members yourself, both in the role list and the channel permissions."
      );
    } catch (e) {
      console.log(e);
    }
  }

  if (toMute.roles.has(role.id))
    return message.channel.send(
      "<:delete:614100269369655306> This user can't be any more silent."
    );

  bot.mutes[toMute.id] = {
    guild: message.guild.id,
    time: Date.now() + parseInt(args[1]) * 1000
  };

  await toMute.roles.cache.add(role);

  fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
    if (err) throw err;
    message.channel.send(
      `<:approve:614100268891504661> User ${
        args[0]
      } has been succesfully muted for ${args[1]} seconds.`
    );
  });
};
