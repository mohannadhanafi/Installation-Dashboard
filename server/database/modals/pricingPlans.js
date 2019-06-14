const Sequelize = require('sequelize');
const connection = require('../config');

const pricingPlans = connection.define('pricingPlans', {

  title: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  price: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.TEXT,
  },
  interval: {
    type: Sequelize.TEXT,
  },
  cta: {
    type: Sequelize.TEXT,
  },
  primary: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  features: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    defaultValue: [],
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

module.exports = pricingPlans;
