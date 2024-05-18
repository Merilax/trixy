function parseCommandTime(time) {
    let timeInt = 0, multiplier = 0, maxTime = 0, scale = "";

    if (!time.match(/^\d+(m|h)$/i))
        throw Error("When? The input will be in minutes (by default) or hours, as the first argument. For example, \`60m\` or \`1h\`, followed by your message.`");

    scale = time.toLowerCase().slice(-1);
    timeInt = parseInt(remindTimeStr.slice(0, -1), 10);

    if (timeInt <= 0)
        throw Error("Time cannot be 0 or lower.");

    switch (scale) {
        case "h":
            maxTime = 8760;
            if (timeInt > maxTime)
                throw Error("Time cannot exceed 8760 hours (1 year).");
            multiplier = 3600000; //ms to h
            scale = 'hours';
            break;
        case "m":
            maxTime = 525600;
            if (timeInt > maxTime)
                throw Error("Time cannot exceed 525600 minutes (1 year).");
            multiplier = 60000; //ms to m
            scale = 'minutes';
            break;
    }
    return [timeInt, multiplier, scale];
}

module.exports = { parseCommandTime };