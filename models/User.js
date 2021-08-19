const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  googleId: {
    type: String,
    required: false,
    default: null,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', User);
