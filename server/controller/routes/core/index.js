
const express = require('express');
const coreItems = require('./coreItems');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', coreItems.get)
  .get('/:id', coreItems.getCore)
  .post('/', coreItems.post)
  .delete('/', coreItems.delete)
  .post('/updateCore', coreItems.updateCore);

module.exports = router;
