const express = require('express');
const team = require('./team');

const router = express.Router();
router
  .get('/', team.get)
  .post('/', team.post)
  .delete('/:id', team.delete)
  .get('/get/:id', team.getOne)
  .post('/update/:id', team.update);

module.exports = router;
