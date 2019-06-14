const express = require('express');
const whyUs = require('./whyUs');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', whyUs.get)
  .use(Auth.checkToken)
  .post('/', whyUs.update);
module.exports = router;
