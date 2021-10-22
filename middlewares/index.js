const passport = require('passport');

module.exports = {
  isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send('You are not authenticated.');
    }
    return next();
  },
  authenticateLogin(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.sendStatus(500);
      }

      if (!user) {
        const { message } = info;

        return res.json({
          success: false,
          message,
        });
      }

      req.login(user, (loginError) => {
        if (loginError) return res.sendStatus(500);
        return next();
      });

      return undefined;
    })(req, res, next);
  },
};
