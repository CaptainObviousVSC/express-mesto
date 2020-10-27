const router = require('express').Router();
const { getCards } = require('../controllers/getCards');

router.get('/cards', getCards);

module.exports = router;
