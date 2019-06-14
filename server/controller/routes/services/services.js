const validatior = require('validator');
const { services } = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await services.findAll({ order: [['id', 'DESC']] });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    const {
      seo, title, desc, body, icon,
    } = data;
    const seoCurrent = await services.count({ where: { seo } });
    if (seoCurrent === 0) {
      await services.create({
        seo: seo.replace(/\s/g, '').toLowerCase(), title, desc, body, icon,
      });
      res.status(200).send({ message: 'New Service Created' });
    } else {
      res.status(400).send({ message: 'Sorry !, Service with this Seo Name is already exist' });
    }
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.delete = (req, res) => {
  try {
    const { id } = req.body;
    services.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: 'Service Deleted',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await services.findAll({ where: { id } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.updateServices = async (req, res) => {
  try {
    const {
      data,
      params: { id },
    } = req.body;
    const {
      seo, title, desc,
    } = data;
    data.seo = data.seo.replace(/\s/g, '').toLowerCase();
    if (
      !title.trim()
      || !desc.trim()
      || !validatior.isLength(title, { min: 1, max: 80 })
      || !validatior.isLength(seo, { min: 1, max: 30 })
      || !validatior.isLength(seo, { min: 1, max: 300 })

    ) {
      res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    } else {
      const serviceCheck = await services.findOne({ where: { seo } });
      if (serviceCheck && serviceCheck.id !== parseInt(id, 10)) {
        res
          .status(400)
          .send({ message: 'Sorry !, Service with this Seo Name is already exist' });
      } else {
        services.update(data, { where: { id } });
        res.status(200).send({ message: 'Service Updated' });
      }
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getBySeo = async (req, res) => {
  try {
    const { seo } = req.params;
    const postResult = await services.findOne({ where: { seo } });
    res.status(200).send(postResult);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
