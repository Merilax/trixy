const fetch = require("node-fetch");
const Discord = require("discord.js");
const TxTE = require("../../TxTE.json");

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
    prefix
) => {
    let city = args.slice().join(" ");
    if (!city)
        return message.channel.send({ content: "Please provide a city name." });

    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=73639e85030b2d8d0e183f862678d6d4`;

    fetch(URL).then(res => res.json()).then(json => {

        let windangle = "";
        if (json.wind.deg) windangle = `, with a ${json.wind.deg}° angle.`;

        let rainvolume = "Unknown";
        if (json.rain) rainvolume = `${json.rain["1h"]}mm`;

        let snowvolume = "Unknown";
        if (json.snow) snowvolume = `${json.snow["1h"]}mm`;

        let visibility = "Unknown";
        if (json.visibility) visibility = `${json.visibility}m`;

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

        const embed = new Discord.EmbedBuilder()
            .addFields([
                { name: "City", value: `${city} (${json.sys.country})` },
                { name: "Coordinates", value: `${json.coord.lon}, ${json.coord.lat}` },
                { name: "Timezone", value: timezone },
                { name: "Weather", value: json.weather[0].description },
                { name: "Temperature", value: `${json.main.temp}°C` },
                { name: "Humidity", value: `${json.main.humidity}%` },
                { name: "Pressure", value: `${json.main.pressure}hPa` },
                { name: "Wind", value: `${json.wind.speed}m/s${windangle}` },
                { name: "Cloudiness", value: `${json.clouds.all}%` },
                { name: "Rain", value: rainvolume },
                { name: "Snow", value: snowvolume },
                { name: "Visibility", value: visibility }
            ])
            .setColor("#4badeb")
            .setFooter({ text: "Powered by OpenWeather" });
        message.channel.send({ embeds: [embed] });
    })
        .catch(error => {
            message.channel.send({ content: `${TxTE.emoji.x} That city is not being monitored, or the API is down.` });
            console.error(err);
        });
};
