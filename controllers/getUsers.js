const path = require('path');
const readFile = require('../utils/read-files');

const jsonDataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = (req, res) => {
  readFile(jsonDataPath).then((data) => res.send(data)).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
const getUser = (req, res) => {
  const { _id } = req.params;
  readFile(jsonDataPath).then((data) => {
    const userToFind = data.find((user) => user._id === _id);
    return userToFind;
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Пользователь не найден' });
    }
    return res.send(user);
  });
};
module.exports = { getUsers, getUser };
