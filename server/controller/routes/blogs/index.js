const express = require('express');
const blogs = require('./blogs');
const comments = require('../comments');

const router = express.Router();
router
  .use('/comments', comments)
  .get('/', blogs.getAll)
  .get('/seo/:seo', blogs.getBySeo)
  .delete('/', blogs.delete)
  .get('/:id', blogs.getPost)
  .post('/', blogs.post)
  .post('/update/:id', blogs.updatePost)
  .post('/changeState', blogs.changeState)
  .get('/:id', blogs.getPost);

module.exports = router;
