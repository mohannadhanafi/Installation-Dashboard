const express = require('express');
const about = require('./about');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', about.get)
  .use(Auth.checkToken)
  .post('/', about.update);
module.exports = router;
