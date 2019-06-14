/* eslint-disable camelcase */
const {
  porfolio_category,
} = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await porfolio_category.findAll({
      order: [
        ['id', 'DESC'],
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
    const result = await porfolio_category.findOne({ where: { id } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    await porfolio_category.create(data);
    res.status(200).send({
      message: 'Portfolio Category Added',
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.update = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    await porfolio_category.update(data, { where: { id } });
    res.status(200).send({
      message: 'Portfolio Category Updated',
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

    await porfolio_category.destroy({
      where: {
        id,
      },
    });
    response.status(200).send({
      message: 'Portfolio Category Deleted',
    });
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
