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
  faces_archive
) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return message.channel.send("<:delete:614100269369655306> You cannot manage roles.");

  function checkRoleType(arg) {
    if (message.guild.roles.cache.find(r => r.name === arg)) {
      return message.guild.roles.cache.find(r => r.name === arg);
    } else if (message.guild.roles.cache.get(arg)) {
      return message.guild.roles.cache.get(arg);
    } else {
      return message.mentions.roles.first();
    }
  }

  let removeMember = message.mentions.members.first();
  var removeRole = checkRoleType(args[1]);

  if (!removeMember)
    return message.channel.send("<<:quote:614100269386432526> Please mention a user.");
  if (!removeRole)
    return message.channel.send("<:quote:614100269386432526> I didn't find that role.");
  if (!removeMember.roles.cache.some(r => r.id === removeRole.id))
    return message.channel.send("<:delete:614100269369655306> But you don't have that role...");

  try {
    removeMember.roles.remove(checkRoleType(args[1]));
    message.channel.send(`<:approve:614100268891504661> Removed **${removeRole.name}** from **${removeMember}**.`);
  } catch (e) {
    console.log(e);
    message.channel.send("<:delete:614100269369655306> I seem to be unable to manage this role or user.");
  }
};
