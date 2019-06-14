const express = require('express');
const testimonials = require('./testimonials');

const router = express.Router();
router
  .get('/', testimonials.getAll)
  .post('/', testimonials.create)
  .get('/:id', testimonials.getOne)
  .delete('/:id', testimonials.delete)
  .post('/update/:id', testimonials.update);
module.exports = router;
