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
  txdev,
  prefix,
  faces_archive,
  queue
) => {
  if (!message.member.hasPermission("MANAGE_ROLES")) {
    return message.channel.send(
      "<:delete:614100269369655306> You cannot manage roles."
    );
  }

  let adduser = message.mentions.members.first();
  let addrole = (message.guild.roles.cache.find((r => r.name === args[1])) || message.mentions.roles.cache.first() || (r => r.id === args[1]));

  if (!adduser)
    return message.channel.send(
      "<:quote:614100269386432526> Please mention a user."
    );
  if (!addrole)
    return message.channel.send(
      "<:quote:614100269386432526> I didn't find that role."
    );

  if (
    adduser.roles.cache.some(addrole)
  ) {
    return message.channel.send(
      "<:delete:614100269369655306> But you already have that role..."
    );
  }

  try {
    adduser.roles.add(addrole);
    message.channel.send(
      `<:approve:614100268891504661> Added **${addrole.name}** to **${adduser}**.`
    );
  } catch (e) {
    console.log(e);
    message.channel.send(
      "<:delete:614100269369655306> I seem to be unable to manage this role or user."
    );
  }
};
