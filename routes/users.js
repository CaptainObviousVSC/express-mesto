const router = require('express').Router();
const { getUsers, getUser, postUsers } = require('../controllers/getUsers');

router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.post('/users', postUsers);
module.exports = { router };
