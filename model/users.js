const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    password: String,
    admin: Boolean
})

const item = module.exports = mongoose.model('user', UserSchema);