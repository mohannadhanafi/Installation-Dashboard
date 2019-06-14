const {
  posts,
  users,
  categories,
} = require('../../../database/modals');

exports.get = async (req, res) => {
  try {
    const result = await posts.findAll({
      where: {
        hero: false,
        approve: true,
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.getHero = async (req, res) => {
  try {
    const result = await posts.findAll({
      where: {
        hero: true,
        approve: true,
      },
      order: [['updatedAt', 'DESC']],
      include: [
        {
          model: users,
          attributes: ['first', 'last'],
        },
        {
          model: categories,
        }],
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};


exports.addHero = async (req, res) => {
  try {
    const {
      data: {
        id,
      },
    } = req.body;
    posts.update({
      hero: true,
    }, {
      where: {
        id,
      },
    });
    res.status(200).send({
      message: 'The post has been added to hero section',
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.removeHero = async (req, res) => {
  try {
    const {
      data: {
        id,
      },
    } = req.body;
    posts.update({
      hero: false,
    }, {
      where: {
        id,
      },
    });
    res.status(200).send({
      message: 'The post has been removed from hero section',
    });
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
