const express = require('express');

const User = require('../models/User');
const { authenticateLogin } = require('../middlewares');

const router = express.Router();

/* ========== Helpers ========== */

/* ========== Routes ========== */

// User register.
router.post('/register', async (req, res) => {
  try {
    const {
      user: { password, ...userRest },
    } = req.body;
    const newUser = new User(userRest);

    await User.register(newUser, password);

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// User login.
// router.post('/login', passport.authenticate('local'), async (req, res) => {
//   const { username, email, name, phone, address } = req.user;
//   const userData = {
//     username,
//     email,
//     name,
//     phone,
//     address,
//   };

//   res.json({
//     isAuthenticated: true,
//     user: userData,
//   });
// });

router.post('/login', authenticateLogin, (req, res) => {
  // It will only enter this handler if authentication is successfull.
  const { username, email, name, phone, address } = req.user;
  const userData = {
    username,
    email,
    name,
    phone,
    address,
  };

  res.json({
    success: true,
    user: userData,
  });
});

// Protected route demo.
// router.get('/protect', isLoggedIn, (req, res) => {
//   res.send('You have successfully entered the protected route.');
// });

module.exports = router;
