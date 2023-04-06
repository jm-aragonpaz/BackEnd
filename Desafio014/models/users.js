const { Schema, model, default: mongoose } = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
});

const Users = mongoose.model('users', UserSchema);
module.exports = Users;
