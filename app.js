const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.connect('mongodb://localhost:27017/mestodb-1', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.use((req, res, next) => {
  req.user = {
    _id: '5fa85003496f3b4da4470249',
  };
  next();
});
app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('/', (req, res) => res.status(404).send({ message: 'Запрашиваемый ресурс не найден' }));
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
