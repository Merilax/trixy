const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    failureRedirect: '/forbidden',
    successRedirect: '/dashboard'
}), (req, res) => {
    res.send(200);
});

module.exports = router;