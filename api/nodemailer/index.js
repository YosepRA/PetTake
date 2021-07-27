const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.ETHEREAL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_USER,
    pass: process.env.ETHEREAL_PASS,
  },
});

module.exports = transporter;
