const { newsletters } = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await newsletters.findAll();
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send('Server Error !');
  }
};
