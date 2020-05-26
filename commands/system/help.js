const Discord = require("discord.js");

module.exports.commanddata = {
  name: "help",
  aliases: ["commands", "cmds"],
  category: "system",
  cooldown: 2,
  guildOnly: false,
  args: false
};

module.exports.run = (
  bot,
  message,
  args,
  ownerid,
  prefix,
  faces_archive,
  queue
) => {
  if (args[0]) {
    var lowercaseargs = args[0].toLowerCase();
  }
  var help = new Discord.RichEmbed()
    .setTitle(
      "<:settings:614100269004750898> **I'd love to help! Listing all commands:**"
    )
    .setDescription(
      "[Need help? Join the support server!](https://discord.gg/ZbUQ8Mh)"
    )
    .addField(
      "**System and information:**",
      "```md\n# help, invite, suggest, ping.```"
    )
    .addField(
      "**Moderation and server management:**",
      "```md\n# prune, kick, ban, mute, addrole, removerole, mute, unmute.```"
    )
    .addField(
      "**Miscellaneous and entertainment:**",
      "```md\n# roll, cat, dog, fox, fact, cosmos, youtube.```"
    )
    .addField(
      "**Utility:**",
      "```md\n# server, user, avatar, weather, remindme.```"
    )
    .addField(
      "**Music:** (laggy, may not even work)",
      "```md\n# play, skip, stop, leave.```"
    )
    .setThumbnail(faces_archive.tv)
    .setFooter("Icons by https://dryicons.com")
    .setColor("BLUE")
    .setTimestamp(new Date());

  if (lowercaseargs === "help") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Help, aka `commands`, `cmds`.",
        `Provides a list of commands and a link to the support server.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "invite") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Invite.",
        `Shares an invite for you to add trixy to a server.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "suggest") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Suggest.",
        `Shares a link to the support server to provide useful feedback.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "ping") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Ping, aka `latency`.",
        `Gets Trixy's API ping and the message endpoint ping.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "prune") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Prune, aka `purge`, `delete`, `bulk`.",
        `Deletes from 1 to 100 messages in the given chat, as long as it's a server channel.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "kick") {
    var helpembed = new Discord.RichEmbed()
      .addField("<:settings:614100269004750898> Kick.", `Kicks a member.`)
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "ban") {
    var helpembed = new Discord.RichEmbed()
      .addField("<:settings:614100269004750898> Ban.", `bans a member`)
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "mute") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Mute.",
        `Mutes a member for a given ammount of time in seconds. Mutes without time don't expire.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "unmute") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Unmute.",
        `Unmutes a member. Only for muted members using Trixy.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "addrole") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Addrole, aka `add`.",
        `Adds a role to a member.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "removerole") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Removerole, aka `remove`.",
        `Removes a role from a member.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "roll") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Roll, aka `dice`, `random`.",
        `Rolls a dice with the given amount of sides, even negatives, because why the hell not!`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "cat") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Cat, aka `kitty`.",
        `Gets a random image of a cat, powered by [random cat](https://aws.random.cat).`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "cosmos") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Cosmos, aka `space`",
        `Gets the daily space image, powered by [NASA Planetary](https://api.nasa.gov).`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "dog") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Dog, aka `puppy`, `doggy`, `doggo`.",
        `Gets a random image of a dog, powered by [dog CEO](https://dog.ceo).`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "fact") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Fact.",
        `Gets a random fact, powered by [uselessfacts](https://uselessfacts.jsph.pl).`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "fox") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Fox, aka `foxy`.",
        `Gets a random image of a fox, powered by [randomfox](https://randomfox.ca).`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "youtube") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Youtube, aka `comment`, `yt`.",
        `Writes a youtube comment for you, maximum 75 characters, powered by [some-random-api](https://some-random-api.ml).`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "leave") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Leave, aka `disconnect`.",
        `Leaves a voice channel.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "play") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Play.",
        `Plays a YouTube video or song in a voice channel, only accepts YouTube URLs.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "skip") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Skip.",
        `Skips the current video or song playing in the queue.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "stop") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Stop.",
        `Clears the queue, similar to \`leave\``
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "avatar") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Avatar.",
        `Gets the avatar of a mentioned user.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "remind") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Remind, aka `remindme`, `note`.",
        `Reminds you of something after a given amount of time in seconds.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "server") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Server, aka `serverinfo`.",
        `Gets the properties of a server.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "user") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> User, aka `userinfo`, `whois`",
        `Gets the properties of an user`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else if (lowercaseargs === "weather") {
    var helpembed = new Discord.RichEmbed()
      .addField(
        "<:settings:614100269004750898> Weather.",
        `Gets the current weather of a city, powered by [openweather](https://api.openweathermap.org). May be innacurate due to a free use of the API.`
      )
      .setColor("BLUE");

    return message.author.send(helpembed).catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> It seems like I can't DM you!"
      );
    });
  } else {
    return message.author
      .send(help)
      .then(() => {
        if (message.channel.type === "dm") return;
        message.channel.send(
          "<:mail:614100269487357984> I've sent you a DM with all my commands!"
        );
      })
      .catch(error => {
        message.channel.send(
          "<:delete:614100269369655306> It seems like I can't DM you!"
        );
      });
  }
};
