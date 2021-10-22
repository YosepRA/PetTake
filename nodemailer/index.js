const nodemailer = require('nodemailer');

const { ETHEREAL_HOST, ETHEREAL_USER, ETHEREAL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  host: ETHEREAL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: ETHEREAL_USER,
    pass: ETHEREAL_PASS,
  },
});

module.exports = transporter;
