const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).populate('owner').orFail(() => {
    const err = new Error('Невозможно получить карточки');
    err.statusCode = 404;
    throw err;
  }).then((data) => res.send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный ID' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно получить карточки' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId).orFail(() => {
    const err = new Error('Невозможно удалить');
    err.statusCode = 404;
    throw err;
  }).then(() => res.status(200).send({ message: 'Карточка удалена' })).catch((err) => {
    if (err.kind === 'ObjectId') {
      return res.status(400).send({ message: 'Невалидный ID' });
    }
    if (err.statusCode === 404) {
      return res.status(404).send({ message: 'Невозможно удалить' });
    }
    return res.status(500).send({ message: 'Ошибка сервера' });
  });
};
const addLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: _id } }, { runValidators: true, new: true }).populate(['likes', 'owner']).orFail(() => {
    const err = new Error('Невозможно поставить лайк');
    err.statusCode = 404;
    throw err;
  }).then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный ID' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно поставить лайк' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const deleteLike = (req, res) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(cardId, { $pull: { likes: _id } }, { runValidators: true, new: true }).populate(['likes', 'owner']).orFail(() => {
    const err = new Error('Невозможно удалить лайк');
    err.statusCode = 404;
    throw err;
  }).then((card) => res.send(card))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный ID' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно поставить лайк' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const postCards = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id }).then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
module.exports = {
  getCards, postCards, deleteCard, addLike, deleteLike,
};
