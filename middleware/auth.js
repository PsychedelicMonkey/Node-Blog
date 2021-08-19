module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    return res.redirect('/auth/login');
  },

  ensureGuest: (req, res, next) => {
    if (!req.isAuthenticated()) {
      return next();
    }

    return res.redirect('/');
  },
};
