const mongoose = require('mongoose');
const validator = require('../utils/validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maqxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: validator,
  },
});
module.exports = mongoose.model('user', userSchema);
