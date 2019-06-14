/* eslint-disable camelcase */
const {
  portfolio, porfolio_category,
} = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await portfolio.findAll({
      order: [
        ['id', 'DESC'],
      ],
      include: [
        {
          model: porfolio_category,
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await portfolio.findOne({ where: { id } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    const { categoty_id } = data;
    const category = await porfolio_category.count({ where: { id: categoty_id } });
    if (category !== 0) {
      await portfolio.create(data);
      res.status(200).send({
        message: 'Portfolio Added',
      });
    } else {
      res.status(400).send({ message: 'This category is not exist' });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.update = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await portfolio.update(data, { where: { id } });
    res.status(200).send({
      message: 'Portfolio Updated',
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.delete = async (request, response) => {
  try {
    const {
      id,
    } = request.body;

    await portfolio.destroy({
      where: {
        id,
      },
    });
    response.status(200).send({
      message: 'Portfolio Deleted',
    });
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
