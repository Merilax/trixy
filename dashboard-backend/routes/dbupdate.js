const router = require('express').Router();
const sqldb = require('../../bot/DB/sequelDB');

function isAuthorized(req, res, next) {
    if (req.user) { next(); }
    else { res.redirect('/'); }
}

router.post('/', isAuthorized, async (req, res) => {
    const dashUserId = req.user.userId;
    //const username = req.user.username;
    //const useravatar = req.user.useravatar;

    const moduleChanged = req.body.edit;
    const valueChanged = req.body.value;
    const guildSet = req.body.guild;

    const userConfig = await sqldb.userConfigDB.findOne({ where: { userId: dashUserId } });
    const guildConfig = await sqldb.guildConfigDB.findOne({ where: { guildId: guildSet } });

    switch (moduleChanged) {
        // Personal configs
        case "personal-card":
            if (valueChanged === "param error") return;
            if (valueChanged.match(/^#[0-9a-f]{3,6}$/i)) { } else return;

            try {
                if (userConfig) {
                    await sqldb.userConfigDB.updateOne({ color: valueChanged }, { where: { userId: dashUserId } });
                } else {
                    await sqldb.userConfigDB.create({
                        userId: dashUserId,
                        color: valueChanged
                    });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        case "personal-card-reset":
            try {
                if (userConfig) {
                    await sqldb.userConfigDB.updateOne({ color: "BLUE" }, { where: { userId: dashUserId } });
                } else {
                    await sqldb.userConfigDB.create({
                        userId: dashUserId,
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
                if (guildConfig) {
                    await sqldb.guildConfigDB.updateOne({ prefix: valueChanged }, { where: { guildId: guildSet } });
                } else {
                    await sqldb.guildConfigDB.create({
                        guildId: guildSet,
                        prefix: valueChanged
                    });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        case "prefix-reset":
            if (guildSet === "guild error") return;
            try {
                if (guildConfig) {
                    await sqldb.guildConfigDB.destroy({ where: { guildId: guildSet } });
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
                if (guildConfig) {
                    await sqldb.guildConfigDB.updateOne({ color: valueChanged }, { where: { guildId: guildSet } });
                } else {
                    await sqldb.guildConfigDB.create({
                        guildId: guildSet,
                        color: valueChanged
                    });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        case "guild-card-reset":
            if (guildSet === "guild error") return;
            try {
                if (guildConfig) {
                    await sqldb.guildConfigDB.updateOne({ color: "BLUE" }, { where: { guildId: guildSet } });
                } else {
                    await sqldb.guildConfigDB.create({
                        guildId: guildSet,
                        color: "BLUE"
                    });
                }
            } catch (err) {
                console.log(err);
            }
            break;

        default: { }
    }
});

module.exports = router;