const router = require('express').Router();
const { getCards, postCards, deleteCard } = require('../controllers/getCards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', postCards);
module.exports = { router };
