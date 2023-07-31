const router = require('express').Router();
const validation = require('../middlewares/validation');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);
router.post('/', validation.checkCreateCard, createCard);
router.delete('/:cardId', validation.checkCardId, deleteCard);
router.put('/:cardId/likes', validation.checkCardId, likeCard);
router.delete('/:cardId/likes', validation.checkCardId, dislikeCard);

module.exports = router;
