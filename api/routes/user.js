const express = require('express');

const User = require('../models/User');
const { authenticateLogin, isLoggedIn } = require('../middlewares');

const router = express.Router();

/* ========== Routes ========== */

// Parse user info based on session state.
router.get('/', (req, res) => {
  if (!req.isAuthenticated()) return res.json({ success: false });

  const {
    user: { username, email, name, phone, address },
  } = req;
  const userData = {
    username,
    email,
    name,
    phone,
    address,
  };

  return res.json({
    success: true,
    user: userData,
  });
});

// User register.
router.post('/register', async (req, res) => {
  try {
    const {
      user: { password, ...userRest },
    } = req.body;
    const newUser = new User(userRest);

    const registeredUser = await User.register(newUser, password);
    // Establish login session.
    req.login(registeredUser, (err) => {
      if (err) throw err;

      const { username, email, name, phone, address } = registeredUser;
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
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: err.message,
    });
  }
});

// User login.
router.post('/login', authenticateLogin, (req, res) => {
  // It will only enter this handler if authentication is successfull.
  // Check out authenticateLogin middleware for rejection logic.
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

// Protected route demo route. Delete if not needed.
// router.get('/protect', isLoggedIn, (req, res) => {
//   res.send('You have successfully entered the protected route.');
// });

module.exports = router;
