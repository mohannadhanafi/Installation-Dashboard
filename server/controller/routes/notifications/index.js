const express = require('express');
const notifications = require('./notifications');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/getNotifications', Auth.checkToken, notifications.get)
  .post('/seenNotification', Auth.checkToken, notifications.seen);
module.exports = router;
