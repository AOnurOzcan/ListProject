var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
    profilePicture: String
  },
  isAdmin: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
