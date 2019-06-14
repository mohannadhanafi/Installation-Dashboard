const express = require('express');
const newsletters = require('./newsletters');

const router = express.Router();
router
  .get('/', newsletters.get);

module.exports = router;
