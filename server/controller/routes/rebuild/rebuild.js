/* eslint-disable no-restricted-syntax */
const fs = require('fs');
const { join } = require('path');
const sequelize = require('../../../database/config');

exports.rebuild = async (req, res) => {
  try {
    const directory = join(__dirname, '..', '..', '..', '..', 'uploads');
    fs.readdir(directory, (err, files) => {
      if (err) {
        res.status(500).send('Error With remove files');
      }
      if (files.length) {
        for (const file of files) {
          fs.unlink(join(directory, file), (err1) => {
            if (err1) {
              res.status(500).send('Error With remove files');
            }
          });
        }
      }
    });
    await sequelize.query('delete from installs');
    await sequelize.query('delete from users');
    await sequelize.query('delete from abouts');
    await sequelize.query('delete from titles');
    await sequelize.query('delete from whyus');
    await sequelize.query('delete from contactus');
    await sequelize.query('delete from heros');
    await sequelize.query('delete from statistics');
    await sequelize.query('delete from testimonials');
    await sequelize.query('delete from teams');
    await sequelize.query('delete from options');
    await sequelize.query('delete from "pricingPlans"');
    await sequelize.query('delete from categories');
    await sequelize.query('delete from posts');
    await sequelize.query('delete from blogs');
    await sequelize.query('delete from galleries');
    await sequelize.query('delete from comments');
    await sequelize.query('delete from services');
    await sequelize.query('delete from titles');
    await sequelize.query('delete from notifications');
    await sequelize.query('delete from features');
    await sequelize.query('delete from partners');
    await sequelize.query('delete from cores');
    await sequelize.query('delete from abouts');
    await sequelize.query('delete from whyus');
    await sequelize.query('delete from porfolios');
    await sequelize.query('delete from porfolio_categories');
    await sequelize.query('delete from contactus');
    await sequelize.query('delete from newsletters');
    await sequelize.query('delete from ads');
    await sequelize.query('delete from homepages');
    await sequelize.query('delete from home_layouts');
    await sequelize.query('delete from threecolumns');


    res.clearCookie('jwt');
    res.status(200).send({ message: 'everything deleted, you will be redirected to installation page' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
