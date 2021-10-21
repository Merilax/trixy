const masterIDs = require('../../masterIDs.json');

module.exports.commanddata = {
  name: "eval",
  cooldown: 2,
  args: true,
  guildOnly: false,
  category: "dev_only"
};

module.exports.run = (
  bot,
  message,
  args,
  prefix
) => {
  function clean(text) {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  }

  if (message.author.id !== masterIDs.txdev) {
    return;
  } else {
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }
};
