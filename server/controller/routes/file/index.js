const express = require('express');
const file = require('./file');

const router = express.Router();
const Auth = require('../../auth');

router
  .get('/getFile/:name', file.get)
  .get('/getFav/:name', file.getFav)
  .post('/uploadFile', file.post)
  .use(Auth.checkToken)
  .post('/removeFile', file.remove)
  .post('/uploadFav', file.postIcon);

module.exports = router;
