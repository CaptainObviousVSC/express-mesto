const router = require('express').Router();
const {
  getUsers, getUser, postUsers, updateUserAvatar, updateUser,
} = require('../controllers/getUsers');

router.get('/users', getUsers);
router.get('/users/:_id', getUser);
router.post('/users', postUsers);
router.patch('/users/me/avatar', updateUserAvatar);
router.patch('/users/me', updateUser);
module.exports = router;
