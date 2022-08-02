const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/',
    successRedirect: '/dashboard'
}), (req, res) => {
    res.send(200);
});
router.get('/logout', (req, res, next) => {
    if (req.user) {
        req.logout(err => {
            if (err) return next(err);
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
});

module.exports = router;