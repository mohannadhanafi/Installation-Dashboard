
/* eslint-disable camelcase */
const validator = require('validator');
const { options } = require('../../../database/modals');

exports.update = async (req, res) => {
  console.log(8888888)
  try {
    const newData = req.body;
    const {
      coloured_logo,
      contact,
      footer_description,
      facebook,
      favicon,
      twitter,
      whatsapp,
      google,
      about_title,
      about_story,
      mobile,
      email,
      copyrights,
      youtube,
      instagram,
      latitude,
      longitude,
      linkedin,
      phone,
      tel,
      fax,
      footer_mobile,
      footer_phone,
    } = newData;
    if (
      (facebook && !validator.isURL(facebook))
      || (twitter && !validator.isURL(twitter))
      || (linkedin && !validator.isURL(linkedin))
      || (whatsapp && !validator.isMobilePhone(whatsapp))
      || (google && !validator.isURL(google))
      || (mobile && !validator.isNumeric(mobile))
      || (email && !validator.isEmail(email))
      || (youtube && !validator.isURL(youtube))
      || (instagram && !validator.isURL(instagram))
      || (copyrights
        && !validator.isLength(copyrights, {
          min: 1,
          max: 70,
        }))
      || (coloured_logo
        && !validator.isLength(coloured_logo, {
          min: 1,
          max: 20,
        }))
      || (about_title
        && !validator.isLength(about_title, {
          min: 1,
          max: 40,
        }))
      || (about_story
        && !validator.isLength(about_story, {
          min: 1,
          max: 40,
        }))
      || (contact
        && !validator.isLength(contact, {
          min: 1,
          max: 400,
        }))
        || (latitude && !validator.isNumeric(latitude))
        || (longitude && !validator.isNumeric(longitude))
        || (footer_description && !validator.isLength(footer_description, { max: 300 }))
        || (phone && !validator.isNumeric(phone))
        || (tel && !validator.isNumeric(tel))
        || (fax && !validator.isNumeric(fax))
        || (footer_mobile && !validator.isNumeric(footer_mobile))
        || (footer_phone && !validator.isNumeric(footer_phone))
    ) {
      return res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
    if (latitude < -90 || latitude > 90) {
      return res.status(400).send({
        message: 'latitude must be between -90 and 90 !',
      });
    }
    if (longitude < -180 || longitude > 180) {
      return res.status(400).send({
        message: 'longitude must be between -180 and 180 !',
      });
    }
    await options.update(newData, {
      where: {},
    });
    res.status(200).send({
      message: 'Options Updated',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
    });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await options.findAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: 'Internal server error',
    });
  }
};
