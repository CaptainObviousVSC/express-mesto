const path = require('path')
const readFile = require('../utils/read-files')
const jsonDataPath = path.join(__dirname, '..', 'data', 'cards.json')
const getCards = (req, res) => {
  readFile(jsonDataPath).then(data => res.send(data))
}
module.exports = { getCards }