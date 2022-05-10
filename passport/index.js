const passport = require('passport');

const User = require('../models/user.js');

/* ========== Passport config ========== */

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport;
