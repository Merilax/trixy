const config = require('../../config.json');

module.exports.commanddata = {
  name: "eval",
  cooldown: 2,
  args: true,
  guildOnly: false,
  category: "devlocked"
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

  if (message.author.id !== config.ownerID) return;

  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

    message.channel.send({ content: `\`\`\`js\n${clean(evaled)}\`\`\`` });
  } catch (err) {
    message.channel.send({ content: `\`\`\`xl\n${clean(err)}\n\`\`\`` });
  }
};
