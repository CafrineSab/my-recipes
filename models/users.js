var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    token: String,
    lastName: String,
    firstName: String,
    email: String,
    password: String,
    recipes : [{type: mongoose.Schema.Types.ObjectId, ref:'recipes'}]
});

var userModel = mongoose.model('users', UserSchema);

module.exports = userModel