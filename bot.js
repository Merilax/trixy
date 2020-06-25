const Discord = require("discord.js");
const fs = require("fs");
const request = require("request");
const { readdirSync } = require("fs");
const bot = new Discord.Client({fetchAllMembers: true});
const { prefix, ownerid, statusquote } = require("./config.json");
const faces_archive = require("./faces_archive.json");
const liveresponse = require("./responsejson.json");
const ytdl = require("ytdl-core");
const opus = require("opusscript");
const winston = require("winston");
const queue = new Map();
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const { inspect } = require("util");

["commands", "aliases"].forEach(x => (bot[x] = new Discord.Collection()));

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" })
  ],
  format: winston.format.printf(
    log => `[${log.level.toUpperCase()}] - ${log.message}`
  )
});

const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
//app.listen(process.env.PORT);
app.listen(process.env.PORT, function() {
  function pingURL(url) {
    return new Promise((resp, rej) => {
      request(
        url,
        { headers: { "User-Agent": "Trixy" } },
        (err, res, body) => {
          if (err) {
            rej();
          } else {
            resp();
          }
        }
      );
    });
  }
  function ping() {
    pingURL("https://vairenv2.glitch.me");
  }
  setInterval(() => {
    ping();
  }, 60000);
  ping();
});
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
app.use(express.static("public"));

const load = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files =>
      files.endsWith(".js")
    );
    for (const file of commands) {
      const pull = require(`${dir}/${dirs}/${file}`);
      if (
        pull.commanddata &&
        typeof pull.commanddata.name === "string" &&
        typeof pull.commanddata.category === "string"
      ) {
        if (bot.commands.get(pull.commanddata.name))
          return console.warn(
            `${warning} Two or more commands have the same name ${pull.commanddata.name}.`
          );
        bot.commands.set(pull.commanddata.name, pull);
        console.log(`${success} Loaded command ${pull.commanddata.name}.`);
      } else {
        console.log(
          `${error} Error loading command in ${dir}${dirs}. you have a missing commanddata.name or commanddata.name is not a string. or you have a missing commanddata.category or commanddata.category is not a string`
        );
        continue;
      }
      if (
        pull.commanddata.aliases &&
        typeof pull.commanddata.aliases === "object"
      ) {
        pull.commanddata.aliases.forEach(alias => {
          if (bot.aliases.get(alias))
            return console.warn(
              `${warning} Two commands or more commands have the same aliases ${alias}`
            );
          bot.aliases.set(alias, pull.commanddata.name);
        });
      }
    }
  });
};
load();

bot.mutes = require("./mutes.json");
bot.reminders = require("./reminders.json");

const cooldowns = new Discord.Collection();

bot.on("message", async message => {
  if (
    message.content.substr(0, prefix.length).toLowerCase() !=
      prefix.toLowerCase() ||
    message.author.bot
  )
    return;

  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let command;

  if (cmd.length === 0) return;
  if (bot.commands.has(cmd) === true) command = bot.commands.get(cmd);
  else if (bot.aliases.has(cmd) === true)
    command = bot.commands.get(bot.aliases.get(cmd));
  else return;

  if (command.commanddata.guildOnly && message.channel.type !== "text") {
    return message.reply(
      "<:block:614100269004881924> I can't execute that command inside DMs!"
    );
  }

  if (command.commanddata.args && !args.length) {
    let reply = ` <:quote:614100269386432526> You didn't provide any arguments, ${message.author}!`;

    if (command.commanddata.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.commanddata.name} ${command.commanddata.usage}\``;
    }

    return message.channel.send(reply);
  }

  if (!cooldowns.has(command.commanddata.name)) {
    cooldowns.set(command.commanddata.name, new Discord.Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.commanddata.name);
  const cooldownAmount = (command.commanddata.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send(
        `<:hourglass2:614100269332037662> Please wait ${timeLeft.toFixed(
          1
        )} more second(s) before using the \`${
          command.commanddata.name
        }\` command.`
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    if (command) {
      command.run(bot, message, args, ownerid, prefix, faces_archive, queue);
    }
  } catch (error) {
    console.error(error);
    message.channel.send(
      `<:window_text:614100269524975620> Send to MantriX#1572. An error ocurred during command execution: ${error}`
    );
  }
});

//Autoresponder//==================================================

bot.on("message", async message => {
  if (message.content.includes("<@583006737322475550> prefix"))
    message.channel.send("Try using `Trixy, help`");
  if (message.content.includes("<@583006737322475550> help"))
    message.channel.send("Try using `Trixy, help`");
  if (message.content.includes("hi Trixy"))
    message.channel.send(`Hello ${message.author.toString()}!`);
  if (message.content.includes("Hi Trixy"))
    message.channel.send(`Hello ${message.author.toString()}!`);
  if (message.content.includes("Trixy, hi"))
    message.channel.send(`Hello ${message.author.toString()}!`);
  if (message.content.includes("Trixy, hello"))
    message.channel.send(`Hello ${message.author.toString()}!`);
  if (message.content.includes("Hello Trixy"))
    message.channel.send(`Hello ${message.author.toString()}!`);
  if (message.content.includes("hello Trixy"))
    message.channel.send(`Hello ${message.author.toString()}!`);

  if (
    message.content.substr(0, prefix.length).toLowerCase() !=
    prefix.toLowerCase()
  )
    return;
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/trixy, /g);
  const command = args.shift().toLowerCase();

  if (command === "send nudes") {
    if (message.channel.nsfw == true)
      return message.channel.send("You pig! You thought it would work here?");
  }

  for (var i = 0; i < liveresponse.length; i++) {
    if (command === liveresponse[i].question) {
      return message.channel.send(
        liveresponse[i].answer[
          Math.floor(Math.random() * liveresponse[i].answer.length)
        ]
      );
    }
  }
});

//STATUS AND TOKEN//========================================
bot.on("debug", m => logger.log("debug", m));
bot.on("warn", m => logger.log("warn", m));
bot.on("error", m => logger.log("error", m));

process.on("uncaughtException", error => logger.log("error", error));

bot.on("ready", () => {
  console.log(
    `Bot has started, with ${bot.users.size} cached users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`
  );

  bot.setInterval(() => {
    for (let mutei in bot.mutes) {
      let mutetime = bot.mutes[mutei].time;
      let muteguildID = bot.mutes[mutei].guild;
      let muteguild = bot.guilds.get(muteguildID);
      let mutemember = muteguild.members.get(mutei);
      let muterole = muteguild.roles.find(r => r.name === "Trixy Mute");
      if (!muterole) continue;

      if (Date.now() > mutetime) {
        console.log(`${mutei} is ready for an unmute`);

          mutemember.removeRole(muterole).catch(trash => {});;
          delete bot.mutes[mutei];

        fs.writeFile("./mutes.json", JSON.stringify(bot.mutes), err => {
          if (err) throw err;
          console.log(`I have unmuted ${mutemember.user.tag}.`);
        });
      }
    }

    for (let remindi in bot.reminders) {
      let remindtime = bot.reminders[remindi].time;
      let reminduser = bot.reminders[remindi].user;
      let remindcontent = bot.reminders[remindi].content;
      let remindmember = bot.users.get(reminduser);

      if (Date.now() > remindtime) {
        remindmember
          .send(`A reminder arrived: ${remindcontent}`)
          .catch(trashlog => {});
        delete bot.reminders[remindi];

        fs.writeFile("./reminders.json", JSON.stringify(bot.reminders), err => {
          if (err) throw err;
        });
      }
    }
  }, 5 * 1000);

  bot.setInterval(() => {
    bot.user.setActivity(
      `${bot.guilds.size} servers, ${bot.users.size} users. ` +
        `${statusquote[Math.floor(Math.random() * statusquote.length)]}`,
      { type: "WATCHING" }
    );
  }, 90 * 1000);
});
bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}).`);
});
bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

bot.login(process.env.TOKEN);
