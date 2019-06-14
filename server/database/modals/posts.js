const Sequelize = require('sequelize');
const connection = require('../config');

const posts = connection.define('posts', {
  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  header_media: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    allowNull: false,
  },
  seo: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  post_intro: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  hero: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  breaking: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    type: Sequelize.DATE,
  },
  updatedAt: {
    allowNull: false,
    defaultValue: Sequelize.NOW,
    type: Sequelize.DATE,
  },
  views: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  approve: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  tags: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
});

module.exports = posts;
