const express = require('express');
const galleries = require('./galleries');

const router = express.Router();
const Auth = require('../../auth');

router
  .get('/', galleries.get)
  .use(Auth.checkToken)
  .post('/', galleries.update);

module.exports = router;
