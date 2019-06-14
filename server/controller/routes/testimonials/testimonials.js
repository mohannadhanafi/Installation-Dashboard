const { testimonials, titles } = require('../../../database/modals');


exports.update = async (request, response) => {
  try {
    const { id } = request.params;
    const data = request.body;
    const {
      name, jobTitle, description,
    } = data;
    if (
      !name.trim
      || !jobTitle.trim
      || !description.trim()
    ) {
      return response
        .status(400)
        .send({ message: 'Wrong in fields! please fill all the fileds with the right data' });
    }

    const updateResult = await testimonials.update(data, { where: { id } });
    response.status(200).send({ message: 'Testimonial Updated' });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.getOne = async (request, response) => {
  try {
    const { id } = request.params;
    const clientResult = await testimonials.findByPk(id);
    if (clientResult) {
      response.status(200).send(clientResult);
    } else {
      response.status(400).send({ message: 'testimonial not found' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.create = async (request, response) => {
  try {
    const data = request.body;
    const {
      name, jobTitle, description,
    } = data;
    if (name.trim() && jobTitle.trim() && description.trim()) {
      await testimonials.create(data);
      response.status(200).send({ message: 'Testimonials Added' });
    } else {
      response.status(400).send({ message: 'Please fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getAll = async (request, response) => {
  try {
    const clientsResult = await testimonials.findAll();
    response.status(200).send(clientsResult);
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.delete = async (request, response) => {
  try {
    const { id } = request.params;
    await testimonials.destroy({ where: { id } });
    response.status(200).send({ message: 'Testimonials Deleted' });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
