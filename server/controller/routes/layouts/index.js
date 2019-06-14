const express = require('express');
const layouts = require('./layouts');

const router = express.Router();
router
  .get('/layouts', layouts.get)
  .post('/layouts', layouts.update)
  .delete('/layouts', layouts.delete)
  .post('/layout/create', layouts.post);

module.exports = router;
