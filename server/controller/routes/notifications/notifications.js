const { notifications } = require('../../../database/modals');
exports.get = async (request, response) => {
  try {
    const { id } = request;
    const notResult = await notifications.findAll(
      {
        // where: { user_id: id },
        raw: true, order: [['id', 'DESC']],
      },
    );
    response.status(200).send(notResult);
  } catch (error) {
    response.status(500).send({ error: 'Internal Server Error' });
  }
};

exports.seen = async (request, response) => {
  // const { id } = request;
  const result = await notifications.update({ seen: true }, { where: {} });
  //  { where: { user_id: id } }

  response.status(200).send({ message: 'seen' });
};
