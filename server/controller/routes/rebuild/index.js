const express = require('express');
const rebuild = require('./rebuild');

const router = express.Router();
router
  .get('/', rebuild.rebuild);
module.exports = router;
