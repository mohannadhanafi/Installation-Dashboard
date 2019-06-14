const express = require('express');
const heading = require('./heading');
const Auth = require('../../auth');

const router = express.Router();
router
  .get('/', heading.getHero)
  .use(Auth.checkToken)
  .get('/no', heading.get)
  .post('/', heading.addHero)
  .post('/remove', heading.removeHero);

module.exports = router;
