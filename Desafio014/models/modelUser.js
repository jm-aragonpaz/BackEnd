const { Schema, model, default: mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  name: { type: String, required: true, max: 100 },
  address: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, max: 100 },
  phone: { type: String, required: true, max: 100 },
  url: { type: String, required: true, max: 100 },
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;
