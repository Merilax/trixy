const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('commands/commands.ejs');
});

module.exports = router;