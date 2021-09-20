const router = require('express').Router();

router.get('/', (req, res) => {
    res.status(200).render('dashboard/dashboard.ejs');
});

router.get('/modules', (req, res) => {
    res.send(200);
});

module.exports = router;