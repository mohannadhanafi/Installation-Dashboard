const express = require('express');
const clients = require('./clients');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', clients.getAll)
  .use(Auth.checkToken)
  .post('/add', clients.create)
  .get('/get/:id', clients.getOne)
  .post('/updateTitle', clients.updateTitle)
  .delete('/delete', clients.delete)
  .post('/update/:id', clients.update);

module.exports = router;
