// Swap Personal and Guild configs

let thisConfig;
const conflist = document.getElementsByClassName('conf');

function selectThis(selected) {
    switch (selected) {
        case "personal": thisConfig = "pconf"; break;
        case "guild": thisConfig = "gconf";
    }

    for (let i = 0; i < 2; i++) {
        conflist[i].style.display = "none";
    }
    document.getElementById(thisConfig).style.display = "flex";
}

// Swap Guild config modules

let thisModule;
const modlist = document.getElementsByClassName('module');

function changeModule(selected) {
    switch (selected) {
        case "system": thisModule = "system"; break;
        case "leveling": thisModule = "leveling";
    }

    for (let i = 0; i < 2; i++) {
        modlist[i].style.display = "none";
    }
    document.getElementById(thisModule).style.display = "flex";
    document.getElementById("gconf2").style.display = "flex";
}

const GuildCard = require('../../DB/modals/GuildCard.js');
// Update DB
const mongodb = require('./DB/mongoDB.js');
const sqldb = require('./DB/sequelDB.js');

const userColor = await PersonalCard.findOne({ discordId: discordId });
const guildColor = await GuildCard.findOne({ discordId: user.id });

function updateDB(inputType) {
    switch (inputType) {
        case "personal-card":
            try {
                if (userColor) {
                    var updateColor = await PersonalCard.findOneAndUpdate({ filter: profile.id, update: { color: "RED" } });
                    done(null, updateColor);
                } else {
                    var newColor = await PersonalCard.create({
                        discordId: profile.id,
                        color: "BLUE"
                    });
                    var savedColor = await newColor.save();
                    done(null, savedColor);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
            break;

        case "personal-card-reset":
            try {
                if (userColor) {
                    var updateColor = await PersonalCard.findOneAndUpdate({ filter: profile.id, update: { color: "BLUE" } });
                    done(null, updateColor);
                } else {
                    var newColor = await PersonalCard.create({
                        discordId: profile.id,
                        color: "BLUE"
                    });
                    var savedColor = await newColor.save();
                    done(null, savedColor);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
            break;

        case "prefix-set":
            break;

        case "prefix-reset":
            break;
/*
        case "guild-card":
            try {
                if (guildColor) {
                    var updateColor = await GuildCard.findOneAndUpdate({ filter: profile.id, update: { color: "YELLOW" } });
                    done(null, updateColor);
                } else {
                    var newColor = await GuildCard.create({
                        discordId: profile.id,
                        color: "BLUE"
                    });
                    var savedColor = await newColor.save();
                    done(null, savedColor);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
            break;

        case "guild-card-reset":
            try {
                if (guildColor) {
                    done(null, color);
                    var updateColor = await GuildCard.findOneAndUpdate({ filter: profile.id, update: { color: "BLUE" } });
                    var savedColor = await newColor.save();
                } else {
                    var newColor = await GuildCard.create({
                        discordId: profile.id,
                        color: "BLUE"
                    });
                    var savedColor = await newColor.save();
                    done(null, savedColor);
                }
            } catch (err) {
                console.log(err);
                done(err, null);
            }
            break;
*/
        default: { }
    }
}