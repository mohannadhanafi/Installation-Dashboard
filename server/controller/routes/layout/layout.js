/* eslint-disable camelcase */
const { homePageLayouts, categories } = require('../../../database/modals');

exports.homePage = async (request, response) => {
  try {
    const homePageResult = await homePageLayouts.findAll({ include: [{ model: categories }], order: [['id', 'DESC']] });
    response.status(200).send(homePageResult);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};


exports.homePageUpdate = async (req, res) => {
  try {
    const { data } = req.body;
    const { position, category_id } = data;
    if (position !== '0') {
      const prevPosition = await homePageLayouts.findAndCountAll({ where: { position }, raw: true });
      const { count, rows } = prevPosition;
      if (count !== 0) {
        const { category_id: prev_id } = rows[0];
        if (prev_id !== category_id) {
          await homePageLayouts.update({ position: 0 }, { where: { category_id: prev_id } });
          await homePageLayouts.update(data, { where: { category_id } });
          res.status(200).send({ message: 'Update has been done' });
        } else {
          await homePageLayouts.update(data, { where: { category_id } });
          res.status(200).send({ message: 'Update has been done' });
        }
      } else {
        await homePageLayouts.update(data, { where: { category_id } });
        res.status(200).send({ message: 'Update has been done' });
      }
    } else {
      await homePageLayouts.update(data, { where: { category_id } });
      res.status(200).send({ message: 'Update has been done' });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};


exports.singleHomePage = async (request, response) => {
  try {
    const { id } = request.query;
    const homePageResult = await homePageLayouts.findAll({ where: { id }, include: [{ model: categories }], order: [['id', 'DESC']] });
    response.status(200).send(homePageResult);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};
