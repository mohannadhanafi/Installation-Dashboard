const Sequelize = require('sequelize');
const connection = require('../config');

const testimonials = connection.define('testimonials', {
  name: Sequelize.TEXT,
  jobTitle: Sequelize.TEXT,
  image: Sequelize.TEXT,
  description: Sequelize.TEXT,
  facebook: Sequelize.TEXT,
  linkedin: Sequelize.TEXT,
  twitter: Sequelize.TEXT,
  instagram: Sequelize.TEXT,
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

module.exports = testimonials;
