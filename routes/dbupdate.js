const router = require('express').Router();
//const sqldb = require('../DB/sequelDB');
//const GuildCard = require('../DB/modals/GuildCard');
const PersonalCard = require('../DB/modals/PersonalCard');

function isAuthorized(req, res, next) {
    if (req.user) { next(); }
    else { res.redirect('/'); }
}

router.post('/', isAuthorized, async (req, res) => {
    console.log("Trigger, dbupdate");
    const discordId = req.user.discordId;
    //const username = req.user.username;
    //const useravatar = req.user.useravatar;

    const userColor = await PersonalCard.findOne({ discordId: discordId });
    //const guildColor = await GuildCard.findOne({ discordId: user.id });
    //const [prefixDB, prefixCreated] = await sqldb.Prefix.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id, prefix: param } });

    const toChange = req.body.edit;
    var toChangeValue = req.body.value;

    switch (toChange) {
        case "personal-card":
            if (toChangeValue.match(/^#[0-9a-f]{3,6}$/i)) { } else return;
            if (toChangeValue === "reset") { toChangeValue = "BLUE" };

            try {
                if (userColor) {
                    await PersonalCard.findOneAndUpdate({ discordId: discordId }, { color: toChangeValue });
                    console.log("Trigger, db find and update");
                } else {
                    await PersonalCard.create({
                        discordId: discordId,
                        color: toChangeValue
                    });
                    console.log("Trigger, db create");
                }
            } catch (err) {
                console.log(err);
            }

            console.log("Trigger, dbupdate switch END");

            break;
        /*
        case "prefix-set":
            if (req.body.value === reset) {
                try {
                    if (prefixDB) {
                        await prefixDB.destroy({ where: { guildId: message.guild.id } });
                    }
                } catch (err) {
                    console.log(err);
                }
            } else {
                
                if (param.match(/^[\w\d\s\W]{1,10}$/i)) { } else return;
                try {
                    if (prefixDB) {
                        await prefixDB.update({ prefix: req.body.value }, { where: { guildId: message.guild.id } });
                    }
                } catch (err) {
                    console.log(err);
                }
                
            }
            break;

        
        case "guild-card":
            if (param.match(/^#[0-9a-f]{3,6}$/i)) { } else return;
            try {
                if (guildColor) {
                    var updateColor = await guildColor.findOneAndUpdate({ filter: profile.id, update: { color: "YELLOW" } });
                    done(null, updateColor);
                } else {
                    var newColor = await guildColor.create({
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
                    var updateColor = await guildColor.findOneAndUpdate({ filter: profile.id, update: { color: "BLUE" } });
                    var savedColor = await newColor.save();
                } else {
                    var newColor = await guildColor.create({
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
});

module.exports = router;