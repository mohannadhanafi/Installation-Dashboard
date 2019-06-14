const express = require('express');
const posts = require('./posts');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/:catSeo/:seo', posts.postSeo)
  .get('/lastposts', posts.lastPosts)
  .get('/trendingPosts', posts.trendingPosts)
  .use(Auth.checkToken)
  .get('/:id', posts.getPost)
  .get('/', posts.get)
  .delete('/', posts.delete)
  .post('/', posts.post)
  .post('/update', posts.updatePost)
  .use(Auth.checkAdmin)
  .post('/changeState', posts.changeState);

module.exports = router;
