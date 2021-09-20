const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('legal/cookie-policy.ejs');
});

module.exports = router;