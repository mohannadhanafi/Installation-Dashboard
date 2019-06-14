const express = require('express');
const portfolioCategory = require('./portfolioCategory');

const router = express.Router();
router
  .get('/', portfolioCategory.get)
  .get('/:id', portfolioCategory.getById)
  .post('/', portfolioCategory.post)
  .post('/update/:id', portfolioCategory.update)
  .delete('/', portfolioCategory.delete);

module.exports = router;
