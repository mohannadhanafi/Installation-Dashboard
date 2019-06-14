const express = require('express');
const partners = require('./partners');

const router = express.Router();
router
  .get('/', partners.getAll)
  .post('/', partners.post)
  .delete('/', partners.delete)
  .get('/:id', partners.getOne)
  .post('/update/:id', partners.update);
module.exports = router;
