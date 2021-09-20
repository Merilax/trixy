const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('legal/disclaimers.ejs');
});

module.exports = router;