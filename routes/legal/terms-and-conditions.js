const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('legal/terms-and-conditions.ejs');
});

module.exports = router;