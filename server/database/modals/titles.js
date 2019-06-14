const Sequelize = require('sequelize');
const connection = require('../config');

const titles = connection.define('titles', {
  servicetitle: { type: Sequelize.TEXT },
  background: {
    type: Sequelize.TEXT,
    defaultValue: 'noPic',
  },
  servicesub: Sequelize.TEXT,
  featurestitle: { type: Sequelize.TEXT },
  featuressub: Sequelize.TEXT,
  featurescta: Sequelize.TEXT,
  featuresimage: Sequelize.TEXT,
  pricingtitle: { type: Sequelize.TEXT },
  pricingsub: Sequelize.TEXT,
  testimonialstitle: Sequelize.TEXT,
  testimonialssub: Sequelize.TEXT,
  partnerstitle: Sequelize.TEXT,
  partnerssub: Sequelize.TEXT,
  teamtitle: Sequelize.TEXT,
  teamsub: Sequelize.TEXT,
  teamdesc: Sequelize.TEXT,
  categoriestitle: Sequelize.TEXT,
  categoriessub: Sequelize.TEXT,
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

module.exports = titles;
