require('dotenv').config();
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { prefix, statusquote } = require("./config.json");
const helplist = require('./commands/system/helplist.json');
const TxTE = require("./TxTE.json");
const winston = require("winston");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const { setTimeout } = require("timers");
const path = require('path');
const nodeCleanup = require('node-cleanup');


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "log" })
  ],
  format: winston.format.printf(
    log => `[${log.level.toUpperCase()}] - ${log.message}`
  )
});

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

// DATABASE ===============================================================================

const mongodb = require('./DB/mongoDB.js');
mongodb.then(() => console.log('Connected to mongoDB!')).catch(err => console.log(err));

const levelCooldown = new Set();
const levelDBTimeout = 60 * 1000;
const xpRandom = Math.floor(Math.random() * 15 + 15);
const db = require('./DB/sequelDB.js');
const Mute = require("./DB/modals/Mutes.js");
const Reminder = require("./DB/modals/Reminders.js");

async function addXP(message) {
  if (!message.guild) return;
  var [guildConfig, xpCreated] = await db.guildConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id } });

  if (guildConfig.xpEnabled === false) { return } else {
    var [xpLevel, levelCreated] = await db.Levels.findOrCreate({ where: { guild: message.guild.id, userId: message.author.id }, defaults: { guild: message.guild.id, user: message.author.tag } });
    await db.Levels.update({ message_count: xpLevel.message_count + 1, xp: xpLevel.xp + xpRandom }, { where: { guild: message.guild.id, userId: message.author.id } });

    if (xpLevel.xp + xpRandom >= (xpLevel.level * 100 + 100)) levelUp(message);
  }
}

async function levelUp(message) {
  var xpLevel = await db.Levels.findOne({ where: { guild: message.guild.id, userId: message.author.id } });

  await db.Levels.update({ level: xpLevel.level + 1, xp: xpLevel.xp - (xpLevel.level * 100 + 100) }, { where: { guild: message.guild.id, userId: message.author.id } });

  var [guildLevelConfig, chCreated] = await db.guildLevelConfigDB.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id } });
  var [userConfig, uCreated] = await db.userConfigDB.findOrCreate({ where: { userId: message.author.id }, defaults: { userId: message.author.id } });

  let doMention = "";

  if (guildLevelConfig) {
    if (userConfig) {
      if (userConfig.doMentionOverride === true) {
        doMention = "<@" + message.author.id + ">";
      } else {
        doMention = message.guild.members.cache.find(m => m.id === message.author.id).user.username;
      }
    } else {
      if (guildLevelConfig.doMention === true) {
        doMention = "<@" + message.author.id + ">";
      } else {
        doMention = message.guild.members.cache.find(m => m.id === message.author.id).user.username;
      }
    }

    try {
      message.guild.channels.cache.find(ch => ch.id === guildLevelConfig.targetChannel).send({ content: `${TxTE.emoji.add} ` + doMention + `, you leveled up! You are now Level ${xpLevel.level + 1}.` });
    } catch (e) { }
  } else {
    message.channel.send({ content: `${TxTE.emoji.add} You leveled up! You are now Level ${xpLevel.level + 1}.` });
  }

  var rewards = await db.XPRewards.findAll({ where: { guild: message.guild.id } });

  if (rewards != null) {
    if (guildLevelConfig.isCumulative === false) {
      let rolelist = [];
      for (i = 0; i < rewards.length; i++) {
        rolelist.push(rewards[i].dataValues);
      };

      let toRemove = [];
      for (i = 0; i < rolelist.length; i++) {
        if (rolelist[i].level !== xpLevel.level + 1) {
          toRemove.push(message.guild.roles.cache.find(r => r.id === rolelist[i].roleId));
        }
      };
      await message.member.roles.remove(toRemove);
    }

    var rewards = await db.XPRewards.findOne({ where: { guild: message.guild.id, level: xpLevel.level + 1 } });
    message.member.roles.add(message.guild.roles.cache.find(r => r.id === rewards.roleId));

  }
}



// EXPRESS ===============================================================================

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const DiscordStrategy = require('../dashboard-backend/strategies/discordstrategy');

// Routes
const authRoute = require('../dashboard-backend/routes/auth');
const dashboardRoute = require('../dashboard-backend/routes/dashboard');
const dbupdateRoute = require('../dashboard-backend/routes/dbupdate');
const commandsRoute = require('../dashboard-backend/routes/commands');
const cookiesRoute = require('../dashboard-backend/routes/legal/cookie-policy');
const disclaimersRoute = require('../dashboard-backend/routes/legal/disclaimers');
const privacyRoute = require('../dashboard-backend/routes/legal/privacy-policy');
const termsRoute = require('../dashboard-backend/routes/legal/terms-and-conditions');
const { default: mongoose } = require('mongoose');

app.use(session({
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 60000 * 60 * 24
  },
  saveUninitialized: false,
  resave: false,
  name: 'discord.oauth2',
  store: MongoStore.create({ mongoUrl: `mongodb+srv://Trixy:${process.env.MONGODB_PASSWORD}@trixy-mondodb.sv0er.mongodb.net/main?retryWrites=true&w=majority` })
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, `../dashboard-frontend/views`));
app.use(express.static(path.join(__dirname, `../dashboard-frontend/public`)));
app.use('partials', express.static(path.join(__dirname, `../dashboard-frontend/views/partials`)));

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

["commands", "aliases"].forEach(x => (bot[x] = new Collection()));

const load = (dir = "./bot/commands") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files =>
      (files.endsWith(".js") /*|| files.endsWith(".cjs")*/)
    );
    for (const file of commands) {
      const pull = require(`../bot/commands/${dirs}/${file}`);
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

const cooldowns = new Collection();

bot.on("messageCreate", async message => {
  if (message.author.bot) return;

  if (levelCooldown.has(message.author.id)) { } else {
    levelCooldown.add(message.author.id);
    if (message.guild) addXP(message);
    setTimeout(() => {
      levelCooldown.delete(message.author.id);
    }, levelDBTimeout);
  } // Checks XP cooldown and adds XP.

  if (message.mentions.users.first()) {
    if ((message.mentions.users.first().id === bot.user.id)) {
      var mentionForHelp = message.content.trim().split(' ');
      switch (mentionForHelp[1]) {
        case "help":
        case "prefix": return message.channel.send({ content: "Try using `Trixy, help`" });
        default: { };
      }
    }
  } // Reacts to bot mention.
  switch (message.content.trim().toLowerCase()) {
    case "hi trixy": case "hello trixy": case "trixy, hi": case "trixy, hello":
      return message.channel.send({ content: `Hello ${message.author.username}!`, reply: { messageReference: message.id } });
  } // Reacts to friendliness. Hi Trixy!

  if (message.author.bot || message.content.includes("@here") || message.content.includes("@everyone")) return; // Returns when author is a bot or when mass mentioned

  if (message.guild) {
    const prefixDB = await db.guildConfigDB.findOne({ where: { guildId: message.guild.id } });
    if (prefixDB !== null) {
      if (prefixDB.prefix !== null) {
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
      } else {
        if (message.content.substr(0, prefix.length).toLowerCase() != prefix.toLowerCase()) {
          return;
        } else {
          var args = message.content
            .slice(prefix.length)
            .trim()
            .split(/ +/g);
        }
      }
    } else {
      if (message.content.substr(0, prefix.length).toLowerCase() != prefix.toLowerCase()) {
        return;
      } else {
        var args = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
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

  if (command.commanddata.guildOnly && message.channel.type !== 0) {
    return message.channel.send({ content: `${TxTE.emoji.block} I can't execute that command inside DMs!` });
  } // GuildOnly command.

  if (command.commanddata.args && !args.length) {
    let reply = `${TxTE.emoji.quote} You didn't provide any arguments, ${message.author}!`;

    if (helplist[command]) {
      reply += `\nThe proper usage would be: \`${prefix}${helplist[command].u}\``;
    }

    return message.channel.send(reply);
  } // Appends command usage if no args found.

  if (!cooldowns.has(command.commanddata.name)) {
    cooldowns.set(command.commanddata.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.commanddata.name);
  const cooldownAmount = (command.commanddata.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.channel.send({
        content: `${TxTE.emoji.time} Please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${command.commanddata.name}\` command.`
      });
    }
  } // Command cooldown

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    if (command) {
      command.run(bot, message, args, prefix);
    }
  } catch (e) {
    console.error(e);
    message.channel.send({
      content: `${TxTE.emoji.windowText} Send to Merilax#1572. An error ocurred during command execution: \n \`\`\`${e}\`\`\``
    });
  }
});



//STATUS AND TOKEN//========================================

bot.on("debug", m => logger.log("debug", m));
bot.on("warn", m => logger.log("warn", m));
bot.on("error", m => logger.log("error", m));



bot.on("ready", async () => {
  console.log(
    `\n\n\nBot has started, with ${bot.users.cache.size} cached users, in ${bot.channels.cache.size} channels of ${bot.guilds.cache.size} guilds.\n\n\n`
  );

  setInterval(async () => {

    const muteDB = await Mute.find();
    const remindDB = await Reminder.find();

    for (i = 0; ; i++) {
      if (!muteDB[i]) break;

      let muteGuild = bot.guilds.cache.get(muteDB[i].guildId);
      if (!muteGuild) {
        await Mute.findOneAndRemove({ guildId: muteDB[i].guildId, userId: muteDB[i].userId });
      }
      let muteMember = muteGuild.members.cache.get(muteDB[i].userId);
      if (!muteMember) continue;
      let muteRole = muteGuild.roles.cache.find(r => r.name === "Trixy Mute");
      if (!muteRole) continue;


      if (muteDB[i].duration == 0) { continue } else if (Date.now() > muteDB[i].duration) {
        muteMember.roles.remove(muteRole);
        await Mute.findOneAndRemove({ guildId: muteDB[i].guildId, userId: muteDB[i].userId })
          .catch(e => console.log(e));
      }
    }

    for (i = 0; ; i++) {
      if (!remindDB[i]) break;

      let remindUser = bot.users.cache.get(remindDB[i].userId);
      if (!remindUser) {
        await Reminder.findOneAndRemove({ userId: remindDB[i].userId, duration: remindDB[i].duration, content: remindDB[i].content });
      }

      if (Date.now() > remindDB[i].duration) {
        remindUser.send({ content: `A reminder arrived:` }).catch(e => { });
        remindUser.send({ content: remindDB[i].content }).catch(e => { });
        await Reminder.findOneAndRemove({ userId: remindDB[i].userId, duration: remindDB[i].duration, content: remindDB[i].content })
          .catch(e => console.log(e));
      }
    }
  }, 60 * 1000);

  bot.user.setActivity(
    `${bot.guilds.cache.size} servers, ${bot.users.cache.size} users.\n@Trixy help. ` +
    `${statusquote[Math.floor(Math.random() * statusquote.length)]}`,
    { type: 3 }
  );

  setInterval(() => {
    bot.user.setActivity(
      `${bot.guilds.cache.size} servers, ${bot.users.cache.size} users.\n@Trixy help. ` +
      `${statusquote[Math.floor(Math.random() * statusquote.length)]}`,
      { type: 3 }
    );
  }, 120 * 1000);
});

bot.on("guildCreate", async guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}).`);
  await db.guildConfigDB.findOrCreate({ where: { guildId: guild.id }, defaults: { guildId: guild.id } });
});

bot.on("guildDelete", async guild => {
  console.log(`I have been removed from: ${guild.name} (${guild.id})`);
  await db.guildConfigDB.destroyAll({ where: { guildId: guild.id } });
  await db.guildLevelConfigDB.destroyAll({ where: { guildId: guild.id } });
  await Mute.deleteMany({ guildId: guild.id });
});

//bot.on('debug', console.log);
bot.login(process.env.TOKEN);

process.on("uncaughtException", error => logger.log("error", error));
//process.on('exit', mongoose.connection.close());
/*
nodeCleanup(function (exitCode, signal) {
    // release resources here before node exits
    if (exitCode === 1) {

    }
    if (signal) {
        unsavedData.save(function done() {
            // calling process.exit() won't inform parent process of signal
            process.kill(process.pid, signal);
        });
        nodeCleanup.uninstall(); // don't call cleanup handler again
        return false;
    }
});*/