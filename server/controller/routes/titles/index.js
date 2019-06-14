const express = require('express');
const titles = require('./titles');

const router = express.Router();
router
  .get('/', titles.getTitle)
  .post('/', titles.update);
module.exports = router;
