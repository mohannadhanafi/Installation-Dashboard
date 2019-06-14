/* eslint-disable camelcase */
/* eslint-disable no-undef */
const Sequelize = require('sequelize');
const { ads } = require('../../../database/modals');

exports.getById = async (request, response) => {
  try {
    const {
      id,
    } = request.params;
    const result = await ads.findByPk(id);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
exports.get = async (req, res) => {
  try {
    const result = await ads.findAll({ order: [['id', 'DESC']] });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
exports.getAds = async (request, response) => {
  try {
    const { page, type } = request.query;

    const adsResult = await ads.findAll({
      order: [
        [Sequelize.literal('RANDOM()')],
      ],
      limit: 1,
      where: { type, page: { $contains: [page] } },
      raw: true,

    });
    if (adsResult.length) {
      response.status(200).send(adsResult);
    } else {
      response.status(204).send({ messge: 'no ads' });
    }
  } catch (error) {
    response.status(500).send({ messge: 'Internal Server Error' });
  }
};
exports.post = async (req, res) => {
  try {
    const adsData = req.body;
    const {
      page, type, mediaType,
    } = adsData;

    if (page && page.length) {
      if (type === 'horizontal') {
        if (mediaType.startsWith('image/')) {
          await ads.create(adsData);
          res.send({ message: 'Ads has been added' });
        } else {
          res.status(401).send({ message: 'Only image is allow in horizontal mode !' });
        }
      } else {
        await ads.create(adsData);
        res.send({ message: 'Ads has been added' });
      }
    } else {
      res.status(401).send({ message: 'please choose Page .. !' });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.delete = (req, res) => {
  try {
    const {
      id,
    } = req.body;
    ads.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: 'Success, category is ads',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.update = async (request, response) => {
  try {
    const { values, params: { id } } = request.body;
    const {
      page, title, type, linkType, category, posts, media, link, mediaType,
    } = values;
    if (type === 'horizontal') {
      if (mediaType) {
        if (mediaType.startsWith('image/')) {
          await ads.update({
            link: null, linkType: null, category: null, posts: null,
          }, { where: { id } });
          const finalUpdate = await ads.update(values, { where: { id } });
          response.status(200).send({
            message: 'Update is done',
          });
        } else {
          response.status(401).send({ message: 'Only image is allow in horizontal mode !' });
        }
      } else {
        await ads.update({
          link: null, linkType: null, category: null, posts: null,
        }, { where: { id } });
        const finalUpdate = await ads.update(values, { where: { id } });
        response.status(200).send({
          message: 'Update is done',
        });
      }
    } else {
      await ads.update({
        link: null, linkType: null, category: null, posts: null,
      }, { where: { id } });
      const finalUpdate = await ads.update(values, { where: { id } });
      response.status(200).send({
        message: 'Update is done',
      });
    }
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
