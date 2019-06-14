const { about } = require('../../../database/modals');

exports.get = async (request, response) => {
  try {
    const aboutResult = await about.findAll();
    response.status(200).send(aboutResult);
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.update = async (req, res) => {
  try {
    const {
      data,
    } = req.body;
    const { title, desc, subtitle } = data;
    if (
      !title.trim()
        && !desc.trim()
        && !subtitle.trim()) {
      res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    } else {
      about.update(data, { where: {} });
      res.status(200).send({ message: 'About Updated' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
