const Sequelize = require('sequelize');
const connection = require('../config');

const users = connection.define('users', {
  first: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  last: {
    type: Sequelize.TEXT,
  },
  username: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  jobtitle: {
    type: Sequelize.TEXT,
  },
  mobile: {
    type: Sequelize.TEXT,
  },
  address: {
    type: Sequelize.TEXT,
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  reset_password: Sequelize.TEXT,
  rule: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'auther',
  },
  pic: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'noPic.jpg',
  },
  bio: {
    type: Sequelize.TEXT,
  },
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

module.exports = users;
