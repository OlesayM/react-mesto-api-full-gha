const Card = require('../models/card');
const ErrNotFound = require('../errors/ErrNotFound');
const ErrForbidden = require('../errors/ErrForbidden');
const ErrBadRequest = require('../errors/ErrBadRequest');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrBadRequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ErrNotFound('Карточка не найдена');
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new ErrForbidden('Нет прав на удаление');
      }
      // console.log(req.params.cardId);
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      next(err);
    });
};
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new ErrNotFound('Карточка не найдена');
      }
      if (String(card.owner) !== String(req.user._id)) {
        throw new ErrForbidden('Нет прав на удаление');
      }
      // console.log(req.params.cardId);
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrNotFound('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new ErrNotFound('Карточка не найдена');
    })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};
