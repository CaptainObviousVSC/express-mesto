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
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
const updateUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { runValidators: true, new: true }).orFail(() => {
    const err = new Error('Невозможно обновить пользователя');
    err.statusCode = 404;
    throw err;
  })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else if (err.reason === null) {
        res.status(400).send({ message: 'Неподходящий тип данных' });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => res.send(user))
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
  getUsers, getUser, postUsers, updateUserAvatar, updateUser,
};
