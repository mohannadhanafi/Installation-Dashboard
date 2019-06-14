const { install } = require('../../database/modals');

exports.checkRoute = async (request, response, next) => {
  const splitArray = request.baseUrl.split('/');
  const name = splitArray[splitArray.length - 1];
  const foundResult = await install.findOne({ where: { tablename: name } });
  if (foundResult) {
    next();
  } else {
    response.status(401).send({ err: 'Route Deosn`t exist !' });
  }
};
