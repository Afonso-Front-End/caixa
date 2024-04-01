const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  username: String,
  useremail: String,
  usercpf: Number,
  role: {
    type: String,
    enum: ['admin', 'operador'],
    default: 'operador',
  },
});

const User = mongoose.model('users', userSchema);

module.exports = User;
