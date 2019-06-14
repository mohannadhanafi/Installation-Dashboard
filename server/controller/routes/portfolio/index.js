const express = require('express');
const portfolio = require('./portfolio');
const portfolioCategory = require('../../routes/portfolioCategory');

const router = express.Router();
router
  .use('/portfolioCategory', portfolioCategory)
  .get('/', portfolio.get)
  .get('/:id', portfolio.getById)
  .post('/', portfolio.post)
  .post('/update/:id', portfolio.update)
  .delete('/', portfolio.delete);

module.exports = router;
