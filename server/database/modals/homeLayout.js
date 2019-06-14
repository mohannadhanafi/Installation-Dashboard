const Sequelize = require('sequelize');
const connection = require('../config');

const homepage = connection.define('homepage', {
  type: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  position: Sequelize.INTEGER,
  name: Sequelize.TEXT,
  show: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  layout_number: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = homepage;
