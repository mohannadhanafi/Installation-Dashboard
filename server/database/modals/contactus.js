const Sequelize = require('sequelize');
const connection = require('../config');

const contactus = connection.define('contactus', {
  name: Sequelize.TEXT,
  email: Sequelize.TEXT,
  mobile: Sequelize.TEXT,
  message: Sequelize.TEXT,
  subject: Sequelize.TEXT,
  file: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  starred: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  important: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  label: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
  sent: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  folder: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  deleted: {
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
});

module.exports = contactus;
