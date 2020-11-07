const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({}).then((data) => res.send(data)).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
const getUser = (req, res) => {
  User.findById(req.params._id).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    return res.status(200).send(user);
  }).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
const postUsers = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar }).then((user) => res.send(user)).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
module.exports = { getUsers, getUser, postUsers };
