const validatior = require('validator');
const { partners } = require('../../../database/modals');

exports.post = async (req, res) => {
  try {
    const data = req.body;
    const { image, link, name } = data;
    if (image.trim() && name.trim()) {
      if (link) {
        if (validatior.isURL(link)) {
          await partners.create(data);
          res.status(200).send({ message: 'Partner Added' });
        } else {
          return res
            .status(400)
            .send({ message: 'Please Enter Valid Url !' });
        }
      }
      await partners.create(data);
      res.status(200).send({ message: 'Partner Added' });
    }
    return res
      .status(400)
      .send({ message: 'Please fill all the fields !' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await partners.findAll({ order: [['id', 'DESC']] });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    await partners.destroy({ where: { id } });
    res.status(200).send({ message: 'Partner Deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await partners.findAll({ where: { id } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.update = async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;
    const {
      name, image, link,
    } = data;
    if (name.trim()) {
      if (image && !image.trim()) {
        return response.status(400).send({ message: 'Please choose an image !' });
      }
      if (link) {
        if (validatior.isURL(link)) {
          await partners.update(data, { where: { id } });
          response.status(200).send({ message: 'Partner Updated' });
        } else {
          return response
            .status(400)
            .send({ message: 'Please Enter Valid Url !' });
        }
      }
      await partners.update(data, { where: { id } });
      response.status(200).send({ message: 'Partner Updated' });
    }
    return response
      .status(400)
      .send({ message: 'Please fill all the fields !' });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
