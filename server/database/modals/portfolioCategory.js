/* eslint-disable camelcase */
const Sequelize = require('sequelize');
const connection = require('../config');

const porfolio_category = connection.define('porfolio_category', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
});

module.exports = porfolio_category;
