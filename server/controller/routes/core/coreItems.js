const validatior = require('validator');
const { core } = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await core.findAll({ order: [['id', 'DESC']] });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    const { title, desc } = data;
    if (title.trim() && desc.trim()) {
      await core.create(data);
    } else {
      res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
    return res.status(200).send({ message: 'Core Item Added' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.delete = (req, res) => {
  try {
    const { id } = req.body;
    core.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: 'Core Item Deleted',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.getCore = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await core.findAll({ where: { id } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.updateCore = async (req, res) => {
  try {
    const {
      data,
      params: { id },
    } = req.body;
    const { title, desc } = data;
    if (
      !title.trim()
      || !desc.trim()
      || !validatior.isLength(title, { min: 1, max: 30 })
    ) {
      return res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
    core.update(data, { where: { id } });
    return res.status(200).send({ message: 'Core Item Updated' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
