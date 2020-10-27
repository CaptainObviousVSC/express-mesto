const path = require('path');

const readFile = require('../utils/read-files');

const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  readFile(jsonDataPath).then((data) => res.send(data)).catch(() => res.status(500).send({ message: 'Файл с данными не найден' }));
};
module.exports = { getCards };
