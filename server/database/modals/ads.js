const Sequelize = require('sequelize');
const connection = require('../config');

const ads = connection.define('ads', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  media: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  language: Sequelize.TEXT,
  country: Sequelize.TEXT,
  date: Sequelize.ARRAY(Sequelize.DATE),
  page: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
  },
  type: Sequelize.TEXT,
  link: Sequelize.TEXT,
  linkType: Sequelize.TEXT,
  category: Sequelize.TEXT,
  posts: Sequelize.TEXT,

  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE,
  },
});

module.exports = ads;
