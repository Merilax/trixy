module.exports.commanddata = {
  name: "removerole",
  aliases: ["remove"],
  category: "moderation",
  cooldown: 2,
  args: true,
  guildOnly: true
};

module.exports.run = (
  bot,
  message,
  args,
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  if (message.member.hasPermission("MANAGE_ROLES") !== true) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot manage roles."
    );
  }

  let removeuser = message.mentions.members.first();
  let removerole = (message.guild.roles.cache.find(role => role.name === args[1]) || message.mentions.roles.cache.first());

  if (!removeuser)
    return message.channel.send(
      "<<:quote:614100269386432526> Please mention an actual user."
    );
  if (!removerole)
    return message.channel.send(
      "<:quote:614100269386432526> I didn't find that role."
    );

  if (!removeuser.roles.cache.some(role => role.name === args[1])) {
    return message.channel.send(
      "<:delete:614100269369655306> But you don't have that role..."
    );
  }

  try {
    removeuser.roles.cache.remove(removerole);
    message.channel.send(
      `<:approve:614100268891504661> Removed **${removerole.name}** from **${removeuser}**`
    );
  } catch (error) {
    console.error(error);
    message.reply(
      "<:delete:614100269369655306> I seem to be unable to manage this role or user."
    );
  }
};
