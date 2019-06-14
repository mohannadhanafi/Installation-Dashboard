const express = require('express');
const pricingPlans = require('./pricingPlans');
const Auth = require('../../auth');

const router = express.Router();
router
  .use(Auth.checkToken)
  .get('/', pricingPlans.getAll)
  .post('/', pricingPlans.post)
  .delete('/', pricingPlans.delete)
  .get('/:id', pricingPlans.getOne)
  .post('/update/:id', pricingPlans.update);


module.exports = router;
