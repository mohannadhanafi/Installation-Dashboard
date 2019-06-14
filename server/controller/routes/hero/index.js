const express = require('express');
const hero = require('./hero');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', hero.get)
  .get('/:id', hero.getById)
  .post('/', Auth.checkToken, hero.post)
  .delete('/:id', Auth.checkToken, hero.delete)
  .post('/update/:id', Auth.checkToken, hero.update);

module.exports = router;
