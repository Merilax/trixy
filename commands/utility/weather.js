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
  txdev,
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

    let timezone;
    switch (json.timezone) {
      case -39600: timezone = "UTC-12"
      case -36000: timezone = "UTC-11"
      case -32400: timezone = "UTC-10"
      case -28800: timezone = "UTC-9"
      case -25200: timezone = "UTC-8"
      case -21600: timezone = "UTC-7"
      case -18000: timezone = "UTC-6"
      case -14400: timezone = "UTC-5"
      case -12600: timezone = "UTC-4"
      case -10800: timezone = "UTC-3"
      case -7200: timezone = "UTC-2"
      case -3600: timezone = "UTC-1"
      case 0: timezone = "UTC+0"
      case 3600: timezone = "UTC+1"
      case 7200: timezone = "UTC+2"
      case 10800: timezone = "UTC+3"
      case 12600: timezone = "UTC+4"
      case 14400: timezone = "UTC+5"
      case 18000: timezone = "UTC+6"
      case 19800: timezone = "UTC+7"
      case 21600: timezone = "UTC+8"
      case 28800: timezone = "UTC+9"
      case 32400: timezone = "UTC+10"
      case 36000: timezone = "UTC+11"
      case 39600: timezone = "UTC+12"
      case 43200: timezone = "UTC+13"
      case 46800: timezone = "UTC+14"
      default: timezone = "Not found"
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
      .setFooter("Powered by [openweather](https://api.openweathermap.org)");
    message.channel.send(embed);
  })
    .catch(error => {
      message.channel.send(
        "<:delete:614100269369655306> That city is not being monitored, or the webpage is down."
      );
      console.error(err);
    });
};
