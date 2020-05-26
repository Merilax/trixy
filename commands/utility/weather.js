const snekfetch = require("snekfetch");
const Discord = require("discord.js");

module.exports.commanddata = {
  name: "weather",
  category: "utility",
  args: true,
  guildOnly: false,
  cooldown: 5
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
  let city = args.slice().join(" ");

  if (!city)
    return message.channel.send(
      "Please provide a city name, like this: \n```css\nTrixy, weather london```"
    );

  let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=73639e85030b2d8d0e183f862678d6d4`;

  snekfetch
    .get(URL)
    .then(res => {
      //if (res.raw.cod === 401) return message.channel.send("Weather module is down.");
      //if (res.raw.cod === 404) return message.channel.send("Weather source is unavailable or city is unregistered.");

      var parser = JSON.parse(res.raw);

      if (!parser.wind.deg) var windangle = "";
      if (parser.wind.deg)
        var windangle = `, with a ${parser.wind.deg}° angle.`;

      if (!parser.rain) var rainvolume = "no";
      if (parser.rain) var rainvolume = `${parser.rain["1h"]}mm`;

      if (!parser.snow) var snowvolume = "no";
      if (parser.snow) var snowvolume = `${parser.snow["1h"]}mm`;

      if (!parser.visibility) var visible = "unsure";
      if (parser.visibility) var visible = `${parser.visibility}m`;

      if (parser.timezone === -39600) {
        var timezone = "MIT";
      } else if (parser.timezone === -36000) {
        var timezone = "MIT";
      } else if (parser.timezone === -32400) {
        var timezone = "AKST";
      } else if (parser.timezone === -28800) {
        var timezone = "PST / AKDT";
      } else if (parser.timezone === -25200) {
        var timezone = "PDT / MST";
      } else if (parser.timezone === -21600) {
        var timezone = "MDT / CST";
      } else if (parser.timezone === -18000) {
        var timezone = "CDT / EST";
      } else if (parser.timezone === -14400) {
        var timezone = "EDT / PRT";
      } else if (parser.timezone === -12600) {
        var timezone = "CNT";
      } else if (parser.timezone === -10800) {
        var timezone = "AGT / BET";
      } else if (parser.timezone === -3600) {
        var timezone = "CAT";
      } else if (parser.timezone === 0) {
        var timezone = "GMT / UTC / WET";
      } else if (parser.timezone === 3600) {
        var timezone = "BST / WEST / CET";
      } else if (parser.timezone === 7200) {
        var timezone = "CEST / EET / AAT";
      } else if (parser.timezone === 10800) {
        var timezone = "EEST / EAT";
      } else if (parser.timezone === 12600) {
        var timezone = "MET";
      } else if (parser.timezone === 14400) {
        var timezone = "NET";
      } else if (parser.timezone === 18000) {
        var timezone = "PLT";
      } else if (parser.timezone === 19800) {
        var timezone = "IST";
      } else if (parser.timezone === 21600) {
        var timezone = "BST";
      } else if (parser.timezone === 28800) {
        var timezone = "CTT / HKT / CST / MST / SST / AWST";
      } else if (parser.timezone === 32400) {
        var timezone = "JST / KST / ACST";
      } else if (parser.timezone === 36000) {
        var timezone = "AEST";
      } else if (parser.timezone === 39600) {
        var timezone = "AEDT / SST*";
      } else if (parser.timezone === 43200) {
        var timezone = "NZST";
      } else if (parser.timezone === 46800) {
        var timezone = "NZDT";
      } else {
        var timezone = "Not universal.";
      }

      const embed = new Discord.RichEmbed()
        .addField("City", `${city} (${parser.sys.country})`, true)
        .addField(
          "Coordinates",
          `${parser.coord.lon}, ${parser.coord.lat}`,
          true
        )
        .addField("Timezone", timezone, true)
        .addBlankField()
        .addField("Weather", parser.weather[0].description, true)
        .addField("Temperature", `${parser.main.temp}°C`, true)
        .addField("Humidity", `${parser.main.humidity}%`, true)
        .addField("Pressure", `${parser.main.pressure}hPa`, true)
        .addBlankField()
        .addField("Wind", `${parser.wind.speed}m/s${windangle}`, true)
        .addField("Cloudiness", `${parser.clouds.all}%`, true)
        .addField("Rain", rainvolume, true)
        .addField("Snow", snowvolume, true)
        .addField("Visibility", visible, true)
        .setColor("BLUE")
        .setFooter("https://openweathermap.org");
      message.channel.send(embed);
    })
    .catch(error =>
      message.channel.send(
        "<:delete:614100269369655306> That city is not being monitored, or the webpage is down."
      )
    );
};
