var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    profilePicture: String
  },
  isAdmin: Boolean
});

module.exports = mongoose.model('User', userSchema);
