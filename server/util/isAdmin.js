module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin == true) {
      return next();
    }
  }

  res.redirect(401, '/');
};