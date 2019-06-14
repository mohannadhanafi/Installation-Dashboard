const { statistics } = require('../../../database/modals');

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const statisticResult = await statistics.findByPk(id);
    res.status(200).send(statisticResult);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    await statistics.create(data);
    res.status(200).send({ message: 'Statistic Added' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.get = async (req, res) => {
  try {
    const result = await statistics.findAll({
      order: [['id', 'DESC']],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { id } = request.body;
    await statistics.destroy({ where: { id } });
    response.status(200).send({ message: 'Statistic Deleted' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.update = async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;
    const { title, count } = data;
    if (title.trim() && count.trim()) {
      await statistics.update(data, { where: { id } });
    } else {
      response.status(401).send({ message: 'Please Fill all the fields' });
    }
    response.status(200).send({ message: 'Statistic Updated' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
