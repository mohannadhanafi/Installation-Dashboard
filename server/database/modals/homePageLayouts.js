const Sequelize = require('sequelize');
const connection = require('../config');

const homePageLayouts = connection.define('home_layouts', {
  layout_name: {
    type: Sequelize.TEXT,
    defaultValue: 0,
  },

  position: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = homePageLayouts;
