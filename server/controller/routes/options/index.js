const express = require('express');
const options = require('./options');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', options.get)
  .use(Auth.checkToken)
  .use(Auth.checkAdmin)
  .post('/', options.update);

module.exports = router;
