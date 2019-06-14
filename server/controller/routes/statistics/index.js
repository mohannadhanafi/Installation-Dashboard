const express = require('express');
const statistics = require('./statistics');

const router = express.Router();
router
  .get('/', statistics.get)
  .post('/', statistics.post)
  .get('/:id', statistics.getById)
  .post('/update/:id', statistics.update)
  .delete('/', statistics.delete);
module.exports = router;
