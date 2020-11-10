const router = require('express').Router();
const {
  getCards, postCards, deleteCard, addLike, deleteLike,
} = require('../controllers/getCards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/cards', postCards);
router.put('/cards/:cardId/likes', addLike);
router.delete('/cards/:cardId/likes', deleteLike);
module.exports = router;
