const express = require('express');
const services = require('./services');

const router = express.Router();
router
  .get('/seo/:seo', services.getBySeo)
  .get('/', services.get)
  .post('/', services.post)
  .delete('/', services.delete)
  .get('/:id', services.getById)
  .post('/update', services.updateServices);
module.exports = router;
