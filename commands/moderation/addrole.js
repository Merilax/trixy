module.exports.commanddata = {
  name: "addrole",
  aliases: ["add"],
  category: "moderation",
  cooldown: 2,
  args: true,
  guildOnly: true
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
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

  let addMember = message.mentions.members.first();
  var addRole = checkRoleType(args[1]);

  if (!addMember)
    return message.channel.send("<:quote:614100269386432526> Please mention a user.");
  if (!addRole)
    return message.channel.send("<:quote:614100269386432526> I didn't find that role.");
  if (addMember.roles.cache.some(r => r.id === addRole.id))
    return message.channel.send("<:delete:614100269369655306> But you already have that role...");

  try {
    addMember.roles.add(addRole);
    message.channel.send(`<:approve:614100268891504661> Added **${addRole.name}** to **${addMember}**.`);
  } catch (e) {
    console.log(e);
    message.channel.send("<:delete:614100269369655306> I seem to be unable to manage this role or user.");
  }
};
