const express = require('express');
const { PORT = 3000 } = process.env
const path = require('path')
const usersRoutes = require('./routes/users')
const cardsRoutes = require('./routes/card')
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', usersRoutes)
app.use('/', cardsRoutes)
app.use('/', (req, res) => {
  return res.status(404).send({message: 'Запрашиваемый ресурс не найден'})
})
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})