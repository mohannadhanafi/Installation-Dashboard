const express = require('express');
const categories = require('./categories');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', categories.get)
  .get('/related', categories.getRelated)
  .get('/allWithCount', categories.allWithCount)
  .get('/CatWithPosts', categories.getCatWithPosts)
  .get('/:id', Auth.checkToken, categories.getCategoty)
  .post('/', Auth.checkToken, categories.post)
  .post('/update', Auth.checkToken, categories.updateCategory)
  .delete('/', Auth.checkToken, categories.delete);

module.exports = router;
