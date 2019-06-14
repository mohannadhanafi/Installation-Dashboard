
const { pricingPlans } = require('../../../database/modals');

exports.getAll = async (request, response) => {
  try {
    const result = await pricingPlans.findAll({ order: [['id', 'DESC']] });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};
exports.getOne = async (request, response) => {
  try {
    const { id } = request.params;

    const result = await pricingPlans.findByPk(id);
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { id } = request.body;
    await pricingPlans.destroy({ where: { id } });
    response.status(200).send({ message: 'Pricing Plan Deleted' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.post = async (request, response) => {
  try {
    const data = request.body;
    const {
      title,
      price,
      image,
      interval,
      features,
    } = data;
    if (title.trim() && price.trim() && interval.trim()) {
      if (image && !image.trim()) {
        return response.status(400).send({ message: 'Please choose an image !' });
      }
      if (features) {
        data.features = features.filter(e => e !== null);
      }
      await pricingPlans.create(data);
      response.status(200).send({ message: 'Pricing Plan Added' });
    } else {
      response.status(400).send({ message: 'Please fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};


exports.update = async (request, response) => {
  try {
    const data = request.body;
    const { id } = request.params;

    const {
      title,
      price,
      image,
      interval,
      features,
    } = data;

    if (title && title.trim() && price && price.trim() && interval && interval.trim()) {
      if (image && !image.trim()) {
        return response.status(400).send({ message: 'Please choose an image !' });
      }
      if (features) {
        data.features = features.filter(e => e !== null);
      } else {
        data.features = [];
      }
      await pricingPlans.update(data, { where: { id } });
      response.status(200).send({ message: 'Pricing Plan Updated' });
    } else {
      response.status(400).send({ message: 'Please fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
