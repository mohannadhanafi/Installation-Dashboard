const { whyus } = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await whyus.findAll();
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
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
      whyus.update(data, {
        where: { },
      });
      res.status(200).send({ message: 'WhyUs Updated ' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
