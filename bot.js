require('dotenv').config();
const Discord = require("discord.js");
const { readdirSync } = require("fs");
const bot = new Discord.Client({ fetchAllMembers: true });
const { prefix, txdev, statusquote } = require("./config.json");
const faces_archive = require("./faces_archive.json");
const liveresponse = require("./responsejson.json");
const helplist = require('./commands/system/helplist.json');
const winston = require("winston");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const { setTimeout } = require("timers");
const path = require('path');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" })
  ],
  format: winston.format.printf(
    log => `[${log.level.toUpperCase()}] - ${log.message}`
  )
});



// DATABASE ===============================================================================

const mongodb = require('./DB/mongoDB.js');
mongodb.then(() => console.log('Connected to mongoDB!')).catch(err => console.log(err));

const levelCooldown = new Set();
const levelDBTimeout = 60 * 1000;
const xpRandom = Math.floor(Math.random() * 15 + 15);
const db = require('./DB/sequelDB.js');

async function addXP(message) {
  if (!message.guild || message.author.bot) return;

  const [xpenable, xpCreated] = await db.XPEnabled.findOrCreate({ where: { guild: message.guild.id }, defaults: { guild: message.guild.id } });

  if (xpenable.enabled === false) { return; } else {
    const [level, levelCreated] = await db.Levels.findOrCreate({ where: { user: message.author.tag, guild: message.guild.id, userId: message.author.id } });
    await db.Levels.update({ message_count: level.message_count + 1, xp: level.xp + xpRandom }, { where: { guild: message.guild.id, userId: message.author.id } })
      .then(levelUp(message, level));
  }
}

async function levelUp(message, level) {
  const xpLimit = (level.level * 100 + 100);

  if (level.xp >= xpLimit) {
    await db.Levels.update({ level: level.level + 1, xp: level.xp - xpLimit }, { where: { guild: message.guild.id, userId: message.author.id } })
      .then(message.channel.send(`<:add:614100269327974405> You leveled up! You are now Level ${level.level + 1}.`));
  }
}



// EXPRESS ===============================================================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('./strategies/discordstrategy');

// Routes
const authRoute = require('./routes/auth');
const dashboardRoute = require('./routes/dashboard');
const dbupdateRoute = require('./routes/dbupdate');
const commandsRoute = require('./routes/commands');
const cookiesRoute = require('./routes/legal/cookie-policy');
const disclaimersRoute = require('./routes/legal/disclaimers');
const privacyRoute = require('./routes/legal/privacy-policy');
const termsRoute = require('./routes/legal/terms-and-conditions');

app.use(session({
  secret: 'secretHere',
  cookie: {
    maxAge: 60000 * 60 * 8
  },
  saveUninitialized: false,
  name: 'discord.oauth2',
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('partials', express.static(path.join(__dirname, 'views/partials')));

app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', authRoute);
app.use('/dashboard', dashboardRoute);
app.use('/commands', commandsRoute);
app.use('/legal/cookie-policy', cookiesRoute);
app.use('/legal/disclaimers', disclaimersRoute);
app.use('/legal/privacy-policy', privacyRoute);
app.use('/legal/terms-and-conditions', termsRoute);
app.use('/dashboard', dashboardRoute);
app.use('/dbupdate', dbupdateRoute);
app.get('/', isAuthorized, (req, res) => {
  res.render('index');
});

function isAuthorized(req, res, next) {
  if (req.user) {
    res.redirect('/dashboard');
  }
  else {
    next();
  }
}

app.listen(PORT, () => { console.log(`Node server running on http://localhost:${3000}`); });



// LOADING COMMANDS =========================================================================

["commands", "aliases"].forEach(x => (bot[x] = new Discord.Collection()));

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

const cooldowns = new Discord.Collection();

bot.on("message", async message => {
  if (levelCooldown.has(message.author.id)) { } else {
    levelCooldown.add(message.author.id);
    addXP(message);
    setTimeout(() => {
      levelCooldown.delete(message.author.id);
    }, levelDBTimeout);
  } // Checks XP cooldown and adds XP.

  if (message.mentions.users.first()) {
    if ((message.mentions.users.first().id === bot.user.id)) {
      var mentionForHelp = message.content.trim().split(' ');
      switch (mentionForHelp[1]) {
        case "help":
        case "prefix": return message.channel.send("Try using `Trixy, help`");
      }
    }
  } // Reacts to bot mention.
  switch (message.content.trim().toLowerCase()) {
    case "hi trixy": case "hello trixy": case "trixy, hi": case "trixy, hello":
      return message.channel.send(`Hello ${message.author.username}!`);
  } // Reacts to friendliness. Hi Trixy!

  if (message.author.bot || message.content.includes("@here") || message.content.includes("@everyone")) return; //Returns when author is a bot or when mass mentioned

  if (message.guild) {
    const prefixDB = await db.Prefix.findOne({ where: { guildId: message.guild.id } });
    if (prefixDB === null) {
      if (
        message.content.substr(0, prefix.length).toLowerCase() != prefix.toLowerCase()
      ) {
        return;
      } else {
        var args = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
      }
    } else {
      if (
        message.content.substr(0, prefixDB.prefix.length).toLowerCase() != prefixDB.prefix
        && message.content.substr(0, prefix.length).toLowerCase() != prefix.toLowerCase()
      ) {
        return;
      } else {
        if (message.content.substr(0, prefix.length).toLowerCase() === prefix.toLowerCase()) {
          var args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        } else {
          var args = message.content
            .slice(prefixDB.prefix.length)
            .trim()
            .split(/ +/g);
        }
      }
    } // Returns unless prefix included and declares args accordingly to prefix used.
  } else {
    if (
      message.content.substr(0, prefix.length).toLowerCase() != prefix.toLowerCase()
      || message.author.bot
      || message.content.includes("@here")
      || message.content.includes("@everyone")
    ) {
      return;
    } else {
      var args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    }
  }

  const cmd = args.shift().toLowerCase();
  let command;

  if (cmd.length === 0) return;
  if (bot.commands.has(cmd) === true) command = bot.commands.get(cmd);
  else if (bot.aliases.has(cmd) === true)
    command = bot.commands.get(bot.aliases.get(cmd));
  else return;

  if (command.commanddata.guildOnly && message.channel.type !== "text") {
    return message.channel.send("<:block:614100269004881924> I can't execute that command inside DMs!");
  } // GuildOnly command.

  if (command.commanddata.args && !args.length) {
    let reply = `<:quote:614100269386432526> You didn't provide any arguments, ${message.author}!`;

    if (helplist[command]) {
      reply += `\nThe proper usage would be: \`${prefix}${helplist[command].u}\``;
    }

    return message.channel.send(reply);
  } // Appends command usage if no args found.

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
        )} more second(s) before using the \`${command.commanddata.name
        }\` command.`
      );
    }
  } // Command cooldown

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    if (command) {
      command.run(bot, message, args, txdev, prefix, faces_archive);
    }
  } catch (error) {
    console.error(error);
    message.channel.send(
      `<:window_text:614100269524975620> Send to Merilax#1572. An error ocurred during command execution: \n \`\`\`${error}\`\`\``
    );
  }
});



//Autoresponder//==================================================

bot.on("message", async message => {
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/trixy, /g);
  const command = args.shift().toLowerCase();

  if (
    message.content.substr(0, prefix.length).toLowerCase() != prefix.toLowerCase()
  ) return;

  if (command === "send nudes") {
    if (message.channel.nsfw === true)
      return message.channel.send("You pig! You thought it would work here?");
  }

  for (i = 0; i < liveresponse.length; i++) {
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

bot.on("ready", async () => {
  console.log(
    `\n\n\nBot has started, with ${bot.users.cache.size} cached users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.\n\n\n`
  );

  bot.setInterval(async () => {
    const muteDB = await db.Mutes.findAll();
    const remindDB = await db.Reminders.findAll();

    for (i = 0; ; i++) {
      if (!muteDB[i]) break;

      let muteguildID = muteDB[i].guildId;
      let muteguild = bot.guilds.cache.get(muteguildID);
      if (!muteguild) {
        await db.Mutes.destroy({ where: { guildId: muteDB[i].guildId, userId: muteDB[i].userId } });
      }
      let mutemember = muteguild.members.cache.get(muteDB[i].userId);
      if (!mutemember) continue;
      let muterole = muteguild.roles.cache.find(r => r.name === "Trixy Mute");
      if (!muterole) continue;


      if (muteDB[i].duration == 0) { continue } else if (Date.now() > muteDB[i].duration) {
        mutemember.roles.remove(muterole);
        await db.Mutes.destroy({ where: { guildId: muteguildID, userId: muteDB[i].userId } })
          .catch(e => console.log(e));
      }
    }

    for (i = 0; ; i++) {
      if (!remindDB[i]) break;

      let userID = remindDB[i].userId;
      let remindUser = bot.users.cache.get(userID);
      if (!remindUser) {
        await db.Reminders.destroy({ where: { userId: userID, duration: remindDB[i].duration, text: remindDB[i].text } });
      }

      if (Date.now() > remindDB[i].duration) {
        remindUser.send(`A reminder arrived:`).catch(e => { });
        remindUser.send(remindDB[i].text).catch(e => { });
        await db.Reminders.destroy({ where: { userId: userID, duration: remindDB[i].duration, text: remindDB[i].text } })
          .catch(e => console.log(e));
      }
    }
  }, 60 * 1000);

  bot.user.setActivity(
    `${bot.guilds.cache.size} servers, ${bot.users.cache.size} users.\n@Trixy help. ` +
    `${statusquote[Math.floor(Math.random() * statusquote.length)]}`,
    { type: "WATCHING" }
  );

  bot.setInterval(() => {
    bot.user.setActivity(
      `${bot.guilds.cache.size} servers, ${bot.users.cache.size} users.\n@Trixy help. ` +
      `${statusquote[Math.floor(Math.random() * statusquote.length)]}`,
      { type: "WATCHING" }
    );
  }, 120 * 1000);
});
bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}).`);
});
bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

//bot.on('debug', console.log);
bot.login(process.env.TOKEN);