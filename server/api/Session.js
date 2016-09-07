var User = require('../models/user');
var passport = require('passport');

project.app.get('/auth/facebook', project.passport.authenticate('facebook', {scope: 'email'}));

project.app.get('/auth/facebook/callback', project.passport.authenticate('facebook', {
  successRedirect: '/#/',
  failureRedirect: '/'
}));

project.app.get('/logout', project.util.isLoggedIn, function (req, res) {
  req.logout();
  res.json({logout: true});
});

// project.app.get('/profile', project.util.isLoggedIn, function (req, res) {
//   User.findById(req.user.id, function (err, user) {
//     if (err)
//       return res.json({error: true});
//     res.json(user);
//   });
// });

project.app.get('/loggedIn', function (req, res) {
  res.send(req.isAuthenticated() ? req.user : false);
});
