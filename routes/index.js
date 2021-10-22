const express = require('express');

const transporter = require('../nodemailer');

const router = express.Router();

/* ========== Routes ========== */
router.post('/message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const messageConfig = {
      from: `"${name}" <${email}>`,
      to: 'customer_pettake@gmail.com',
      subject,
      text: message,
    };

    await transporter.sendMail(messageConfig);

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
