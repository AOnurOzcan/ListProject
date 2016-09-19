var User = require('../models/userModel');
var passport = require('passport');

project.app.get('/auth/facebook', project.passport.authenticate('facebook', {scope: 'email'}));

project.app.get('/auth/facebook/callback', project.passport.authenticate('facebook', {
  successRedirect: '/#/',
  failureRedirect: '/'
}));

project.app.get('/logout', project.util.isLoggedIn, function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    if (err) return res.send(err);
    res.json({logout: true});
  });
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
