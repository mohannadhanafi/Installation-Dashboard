const express = require('express');
const install = require('./install');

const router = express.Router();

router
  .get('/', install.installCheck)
  .get('/tables', install.getTables)
  .post('/', install.install);

module.exports = router;
