const Sequelize = require('sequelize');
const connection = require('../config');

const categories = connection.define('categories', {
  name: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  parent: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  pic: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'noPic.jpg',
  },
  seo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  colour: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
});

module.exports = categories;
