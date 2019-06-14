const Sequelize = require('sequelize');
const connection = require('../config');

const whyus = connection.define('whyus', {
  icon: {
    type: Sequelize.TEXT,
    defaultValue: 'noPic',
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false,

  },
  subtitle: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  desc: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  call_Action: {
    type: Sequelize.TEXT,
  },
  body: {
    type: Sequelize.TEXT,
  },
  createdAt: {
    defaultValue: Sequelize.NOW,
    type: Sequelize.DATE,
  },
  updatedAt: {
    defaultValue: Sequelize.NOW,
    type: Sequelize.DATE,
  },
});

module.exports = whyus;
