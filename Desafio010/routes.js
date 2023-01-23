const router = require('express').Router();

router.get('/', async (req, res) => {
    console.log('entro a router');
    try {
        res.render('inicio');
    } catch (e) {
        console.log('no pudeo renderizar inicio');
        throw e;
    }
});

module.exports = router;
