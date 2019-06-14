const Sequelize = require('sequelize');
const connection = require('../config');

const galleries = connection.define('galleries', {

  pic: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
});

module.exports = galleries;
