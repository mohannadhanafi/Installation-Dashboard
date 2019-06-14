const express = require('express');
const contactus = require('./contactus');

const router = express.Router();
router
  .get('/', contactus.get)
  .get('/getSendEmail', contactus.getSendEmail)
  .post('/sendEmail', contactus.post)
  .post('/edit/starred', contactus.editStarred)
  .post('/edit/detele', contactus.editDeleted)
  .post('/edit/important', contactus.editImportant)
  .post('/edit/read', contactus.editRead);
module.exports = router;
