const { hero } = require('../../../database/modals');


exports.getById = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await hero.findAll({ where: { id } });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    const {
      title, cta, description, image, body,
    } = data;
    if (title.trim() && cta.trim() && description.trim() && image.trim() && body.trim()) {
      await hero.create(data);
      return res.status(200).send({ message: 'New Hero Created' });
    }
    res.status(401).send({
      message: 'Invalid inputs, please note the type of each input',
    });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await hero.findAll({
      order: [['id', 'DESC']],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { id } = request.params;
    await hero.destroy({ where: { id } });
    response.status(200).send({ message: 'Hero Deleted' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.update = async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;
    await hero.update(data, { where: { id } });
    response.status(200).send({ message: 'Hero Updated' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
