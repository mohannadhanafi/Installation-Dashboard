const Sequelize = require('sequelize');
const connection = require('../config');

const install = connection.define('install', {
  tablename: { type: Sequelize.TEXT, allowNull: false },
});
module.exports = install;
