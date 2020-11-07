const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({}).then((data) => res.send(data)).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
const deleteCard = (req, res) => {
  Card.deleteById(req.params._id).then((card) => {
    if (!card) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(card);
  }).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
const postCards = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link }).then((card) => res.send(card)).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
module.exports = { getCards, postCards, deleteCard };
