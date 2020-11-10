const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({}).orFail(() => {
    const err = new Error('Невозможно получить пользователя');
    err.statusCode = 404;
    throw err;
  }).then((data) => res.send(data))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный ID' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно получить пользователей' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const getUser = (req, res) => {
  User.findById(req.params._id).orFail(() => {
    const err = new Error('Невозможно получить пользователей');
    err.statusCode = 404;
    throw err;
  }).then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидный ID' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно получить пользователей' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { runValidators: true, new: true }).orFail(() => {
    const err = new Error('Невозможно обновить аватар');
    err.statusCode = 404;
    throw err;
  }).then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидная ссылка' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно обновить аватар' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true }).orFail(() => {
    const err = new Error('Невозможно обновить пользователя');
    err.statusCode = 404;
    throw err;
  }).then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидное имя или описание' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно обновить пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).orFail(() => {
    const err = new Error('Невозможно добавить пользователя');
    err.statusCode = 404;
    throw err;
  }).then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Невалидные имя или описание или аватар' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Невозможно добавить пользователя' });
      }
      return res.status(500).send({ message: 'Ошибка сервера' });
    });
};
module.exports = {
  getUsers, getUser, postUsers, updateUserAvatar, updateUser,
};
