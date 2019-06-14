const Sequelize = require('sequelize');
const connection = require('../config');

const options = connection.define('options', {
  // //////// Main ////////
  logo: Sequelize.TEXT,

  // //////// favicon ////////
  favicon: Sequelize.TEXT,

  // //////// Footer ////////
  footer_description: Sequelize.TEXT,
  white_logo: Sequelize.TEXT,
  copyrights: Sequelize.TEXT,
  footer_logo: Sequelize.TEXT,

  // //////// Social Media ////////
  facebook: Sequelize.TEXT,
  twitter: Sequelize.TEXT,
  whatsapp: Sequelize.TEXT,
  google: Sequelize.TEXT,
  youtube: Sequelize.TEXT,
  instagram: Sequelize.TEXT,
  linkedin: Sequelize.TEXT,
  email: Sequelize.TEXT,
  address: Sequelize.TEXT,
  // ///////////// Map ///////////////////
  latitude: Sequelize.DECIMAL,
  longitude: Sequelize.DECIMAL,
  // //////// Timestamps ////////
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
  // contact: {
  //   type: Sequelize.TEXT,
  // },
  // logo: {
  //   type: Sequelize.TEXT,
  // },
  // email: Sequelize.TEXT,
  // about_title: Sequelize.TEXT,
  // about_desc: Sequelize.TEXT,
  // about_story: Sequelize.TEXT,
  // about_story_desc: Sequelize.TEXT,
  // mobile: Sequelize.TEXT,
  // type: Sequelize.TEXT,
  phone: Sequelize.TEXT,
  tel: Sequelize.TEXT,
  fax: Sequelize.TEXT,
  googleplay: Sequelize.TEXT,
  appstore: Sequelize.TEXT,
  footer_mobile: Sequelize.TEXT,
  footer_email: Sequelize.TEXT,
  footer_address: Sequelize.TEXT,
  footer_phone: Sequelize.TEXT,
  name: Sequelize.TEXT,
  header: Sequelize.TEXT,
  footer: Sequelize.TEXT,
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  color: Sequelize.TEXT,
  mail: Sequelize.TEXT,
  password: Sequelize.TEXT,
  category_post_no: {
    type: Sequelize.INTEGER,
    defaultValue: 5,
  },
  category_right: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  category_layout: Sequelize.TEXT,
  type: Sequelize.TEXT,
});

module.exports = options;
