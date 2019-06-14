const express = require('express');
const comments = require('./comments');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', comments.get)
  .post('/', comments.post)
  .delete('/', comments.delete)
  .post('/update', comments.update)

  .post('/addComment', comments.postN)
  .get('/getAll', comments.getN)
  .use(Auth.checkToken)
  .post('/delete', comments.deleteN)
  .post('/update', comments.updateN);

module.exports = router;
