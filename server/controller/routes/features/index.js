
const express = require('express');
const features = require('./features');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', features.getAll)
  .get('/:id', features.getOne)
  .use(Auth.checkToken)
  .post('/', features.post)
  .post('/update', features.update)
  .delete('/', features.delete);

module.exports = router;
