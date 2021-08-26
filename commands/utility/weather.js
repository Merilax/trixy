const nodefetch = require("node-fetch");
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

  nodefetch(URL).then(res => res.json()).then(json => {

      if (!json.wind.deg) var windangle = "";
      if (json.wind.deg)
        var windangle = `, with a ${json.wind.deg}° angle.`;

      if (!json.rain) var rainvolume = "no";
      if (json.rain) var rainvolume = `${json.rain["1h"]}mm`;

      if (!json.snow) var snowvolume = "no";
      if (json.snow) var snowvolume = `${json.snow["1h"]}mm`;

      if (!json.visibility) var visible = "unsure";
      if (json.visibility) var visible = `${json.visibility}m`;

      if (json.timezone === -39600) {
        var timezone = "MIT";
      } else if (json.timezone === -36000) {
        var timezone = "MIT";
      } else if (json.timezone === -32400) {
        var timezone = "AKST";
      } else if (json.timezone === -28800) {
        var timezone = "PST / AKDT";
      } else if (json.timezone === -25200) {
        var timezone = "PDT / MST";
      } else if (json.timezone === -21600) {
        var timezone = "MDT / CST";
      } else if (json.timezone === -18000) {
        var timezone = "CDT / EST";
      } else if (json.timezone === -14400) {
        var timezone = "EDT / PRT";
      } else if (json.timezone === -12600) {
        var timezone = "CNT";
      } else if (json.timezone === -10800) {
        var timezone = "AGT / BET";
      } else if (json.timezone === -3600) {
        var timezone = "CAT";
      } else if (json.timezone === 0) {
        var timezone = "GMT / UTC / WET";
      } else if (json.timezone === 3600) {
        var timezone = "BST / WEST / CET";
      } else if (json.timezone === 7200) {
        var timezone = "CEST / EET / AAT";
      } else if (json.timezone === 10800) {
        var timezone = "EEST / EAT";
      } else if (json.timezone === 12600) {
        var timezone = "MET";
      } else if (json.timezone === 14400) {
        var timezone = "NET";
      } else if (json.timezone === 18000) {
        var timezone = "PLT";
      } else if (json.timezone === 19800) {
        var timezone = "IST";
      } else if (json.timezone === 21600) {
        var timezone = "BST";
      } else if (json.timezone === 28800) {
        var timezone = "CTT / HKT / CST / MST / SST / AWST";
      } else if (json.timezone === 32400) {
        var timezone = "JST / KST / ACST";
      } else if (json.timezone === 36000) {
        var timezone = "AEST";
      } else if (json.timezone === 39600) {
        var timezone = "AEDT / SST*";
      } else if (json.timezone === 43200) {
        var timezone = "NZST";
      } else if (json.timezone === 46800) {
        var timezone = "NZDT";
      } else {
        var timezone = "Not universal.";
      }

      const embed = new Discord.MessageEmbed()
        .addField("City", `${city} (${json.sys.country})`, true)
        .addField(
          "Coordinates",
          `${json.coord.lon}, ${json.coord.lat}`,
          true
        )
        .addField("Timezone", timezone, true)
        .addField("Weather", json.weather[0].description, true)
        .addField("Temperature", `${json.main.temp}°C`, true)
        .addField("Humidity", `${json.main.humidity}%`, true)
        .addField("Pressure", `${json.main.pressure}hPa`, true)
        .addField("Wind", `${json.wind.speed}m/s${windangle}`, true)
        .addField("Cloudiness", `${json.clouds.all}%`, true)
        .addField("Rain", rainvolume, true)
        .addField("Snow", snowvolume, true)
        .addField("Visibility", visible, true)
        .setColor("BLUE")
        .setFooter("https://openweathermap.org");
      message.channel.send(embed);
    })
    .catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> That city is not being monitored, or the webpage is down."
      );
      console.error(err);
      });
};
