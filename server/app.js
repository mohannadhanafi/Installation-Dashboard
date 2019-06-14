const nodemailer = require('nodemailer');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const informative = require('./controller');

const app = express();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

app
  .set('port', process.env.PORT || 5000)
  .set('mailer', transporter)
  .disable('x-powered-by')

  .use(fileUpload())
  .use(cookieParser())
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  .use('/api/v2', informative)
  .use(express.static(path.join(__dirname, '..', 'client', 'home', 'build')))
  .use(express.static(path.join(__dirname, '..', 'client', 'admin', 'build')))
  .get('/admin*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', 'client', 'admin', 'build', 'index.html'),
    );
  })
  .get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'home', 'error.html'));
  });

module.exports = app;
