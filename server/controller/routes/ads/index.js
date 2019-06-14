const express = require('express');
const ads = require('./ads');

const router = express.Router();
router
  .get('/get', ads.getAds)
  .get('/', ads.get)
  .get('/:id', ads.getById)
  .post('/update', ads.update)
  .post('/', ads.post)
  .delete('/', ads.delete);
module.exports = router;
