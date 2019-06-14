const { galleries } = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await galleries.findAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const { data, params: { id } } = req.body;
    galleries.update(data, { where: { } });
    res.status(200).send({ message: 'galleries  updated' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
