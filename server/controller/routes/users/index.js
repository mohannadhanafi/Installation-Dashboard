const express = require('express');
const users = require('./users');
const login = require('./login');
const logout = require('./logout');
const resetPassword = require('./resetPassword');
const Auth = require('../../auth');

const router = express.Router();
router

  .post('/login', login.post)
  .get('/logout', logout.get)
  .post('/resetPassword', resetPassword.sendEmail)
  .post('/updatePassword', resetPassword.updatePassword)
  .use(Auth.checkToken)
  .get('/detailsUser', users.getDetailsUser)
  .get('/profile', users.getProfile)
  .get('/', users.getAll)
  .get('/:id', users.getUserById)
  .post('/', users.post)
  .post('/update', users.updateUser)
  .post('/profile', users.updateProfile)
  .delete('/', users.delete);

module.exports = router;
