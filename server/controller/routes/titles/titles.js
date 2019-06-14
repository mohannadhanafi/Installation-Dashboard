const { titles } = require('../../../database/modals');

exports.getTitle = async (req, res) => {
  try {
    const result = await titles.findAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

exports.update = async (req, res) => {
  try {
    const data = req.body;
    titles.update(data, { where: { } });
    res.status(200).send({ message: 'Updated' });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};
