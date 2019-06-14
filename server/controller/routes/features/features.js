const { features } = require('../../../database/modals');

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const featureRsult = await features.findByPk(id);
    res.status(200).send(featureRsult);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.getAll = async (request, response) => {
  try {
    const featuresResult = await features.findAll({ order: [['id', 'DESC']] });
    response.status(200).send(featuresResult);
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.post = async (request, response) => {
  try {
    const data = request.body;
    const { title, desc } = request.body;    
    if (title.trim() && desc.trim()) {
      await features.create(data);
      response.status(200).send({ message: 'Feature Added' });
    } else {
      response.status(400).send({ message: 'Please fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { id } = request.body;
    await features.destroy({ where: { id } });
    response.status(200).send({ message: 'Success, The feature has been deleted' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getOne = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await features.findAll({ where: { id } });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.update = async (request, response) => {
  try {
    const {
      data,
      params: { id },
    } = request.body;
    const { title, desc } = data;
    if (title && title.trim() && desc && desc.trim()) {
      await features.update(data, { where: { id } });
      response.status(200).send({ message: 'Feature  Updated' });
    } else {
      response.status(400).send({ message: 'Please fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
