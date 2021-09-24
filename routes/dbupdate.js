const router = require('express').Router();
const sqldb = require('../DB/sequelDB.js');
//const GuildCard = require('../DB/modals/GuildCard.js');
const UserCard = require('../DB/modals/PersonalCard.js');

function isAuthorized(req, res, next) {
    if (req.user) { next(); }
    else { res.redirect('/'); }
}

router.post('/', isAuthorized, async (req, res) => {

    const userColor = await UserCard.findOne({ discordId: discordId });
    //const guildColor = await GuildCard.findOne({ discordId: user.id });
    const [prefixDB, prefixCreated] = await sqldb.Prefix.findOrCreate({ where: { guildId: message.guild.id }, defaults: { guildId: message.guild.id, prefix: param } });

    switch (req.body.edit) {
        case "personal-card":
            if (req.body.value === reset) {
                try {
                    if (userColor) {
                        var updateColor = await userColor.findOneAndUpdate({ filter: profile.id, update: { color: "BLUE" } });
                        done(null, updateColor);
                    } else {
                        var newColor = await userColor.create({
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
            } else {
                if (param.match(/^#[0-9a-f]{3,6}$/i)) { } else return;
                try {
                    if (userColor) {
                        var updateColor = await userColor.findOneAndUpdate({ filter: profile.id, update: { color: param } });
                        done(null, updateColor);
                    } else {
                        var newColor = await userColor.create({
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
            }
            break;

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
                /*
                if (param.match(/^[\w\d\s\W]{1,10}$/i)) { } else return;
                try {
                    if (prefixDB) {
                        await prefixDB.update({ prefix: param }, { where: { guildId: message.guild.id } });
                    }
                } catch (err) {
                    console.log(err);
                }
                */
            }
            break;

        /*
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