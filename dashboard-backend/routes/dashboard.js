const router = require('express').Router();

function isAuthorized(req, res, next) {
    if (req.user) { next(); }
    else { res.redirect('/'); }
}

router.get('/', isAuthorized, async (req, res) => {
    res.render('dashboard/dashboard.ejs', {
        userId: req.user.userId,
        username: req.user.username,
        useravatar: req.user.useravatar,
        guilds: req.user.guilds
    });
});

module.exports = router;