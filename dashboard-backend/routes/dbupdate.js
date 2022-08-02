const router = require('express').Router();
const sqldb = require('../../bot/DB/sequelDB');
const GuildCard = require('../../bot/DB/modals/GuildCard');
const PersonalCard = require('../../bot/DB/modals/PersonalCard');

function isAuthorized(req, res, next) {
    if (req.user) { next(); }
    else { res.redirect('/'); }
}

router.post('/', isAuthorized, async (req, res) => {
    const discordId = req.user.discordId;
    //const username = req.user.username;
    //const useravatar = req.user.useravatar;

    const moduleChanged = req.body.edit;
    const valueChanged = req.body.value;
    const guildSet = req.body.guild;

    const userColor = await PersonalCard.findOne({ discordId: discordId });
    const guildColor = await GuildCard.findOne({ discordId: discordId });
    const prefixDB = await sqldb.Prefix.findOne({ where: { guildId: guildSet } });

    switch (moduleChanged) {
        // Personal configs
        case "personal-card":
            if (valueChanged === "param error") return;
            if (valueChanged.match(/^#[0-9a-f]{3,6}$/i)) { } else return;

            try {
                if (userColor) {
                    await userColor.updateOne({ color: valueChanged });
                } else {
                    await PersonalCard.create({
                        discordId: discordId,
                        color: valueChanged
                    });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        case "personal-card-reset":
            try {
                if (userColor) {
                    await userColor.updateOne({ color: "BLUE" });
                } else {
                    await PersonalCard.create({
                        discordId: discordId,
                        color: "BLUE"
                    });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        // Guild configs
        case "prefix":
            if (guildSet === "guild error") return;
            if (valueChanged === "param error") return;
            if (valueChanged.match(/^[\w\d\s\W]{1,10}$/i)) { } else return;
            try {
                if (prefixDB) {
                    await prefixDB.update({ prefix: valueChanged }, { where: { guildId: guildSet } });
                } else {
                    await prefixDB.create({ guildId: guildSet, prefix: valueChanged })
                }
            } catch (err) {
                console.log(err);
            }
            break;

        case "prefix-reset":
            if (guildSet === "guild error") return;
            try {
                if (prefixDB) {
                    await prefixDB.destroy({ where: { guildId: guildSet } });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        case "guild-card":
            if (guildSet === "guild error") return;
            if (valueChanged === "param error") return;
            if (valueChanged.match(/^#[0-9a-f]{3,6}$/i)) { } else return;
            try {
                if (guildColor) {
                    var updateColor = await guildColor.updateOne({ color: valueChanged });
                    done(null, updateColor);
                } else {
                    var newColor = await guildColor.create({
                        discordId: discordId,
                        color: valueChanged
                    });
                    var savedColor = await newColor.save();
                    done(null, savedColor);
                }
            } catch (err) {
                console.log(err);
                //done(err, null);
            }
            break;

        case "guild-card-reset":
            if (guildSet === "guild error") return;
            try {
                if (guildColor) {
                    done(null, color);
                    var updateColor = await guildColor.updateOne({ color: "BLUE" });
                    var savedColor = await newColor.save();
                } else {
                    var newColor = await guildColor.create({
                        discordId: discordId,
                        color: "BLUE"
                    });
                    var savedColor = await newColor.save();
                    done(null, savedColor);
                }
            } catch (err) {
                console.log(err);
                //done(err, null);
            }
            break;

        default: { }
    }
});

module.exports = router;