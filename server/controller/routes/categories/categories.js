/* eslint-disable no-param-reassign */
const validator = require('validator');
const Sequelize = require('../../../database/config');
const { categories, posts, homePageLayouts, users } = require('../../../database/modals');

exports.get = async (request, response) => {
  try {
    const result = await Sequelize.query(
      'select a.*, b.name as parent_name from categories as a left join categories as b on b.id = a.parent order by id DESC',
    );
    response.status(200).send(result[0]);
  } catch (error) {
    response.status(500).send('Server Error');
  }
};
exports.allWithCount = async (request, response) => {
  try {
    const result = await categories.findAll();
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Server Error');
  }
};
exports.getRelated = async (request, response) => {
  const result = await posts.findAll({
    order: [['updatedAt', 'DESC']],
    limit: 10,
    where: { approve: true, breaking: true },
    include: [{ model: categories }],
  });
  response.status(200).send(result);
};
exports.post = async (request, response) => {
  try {
    const newCat = request.body;
    const {
      name, seo, parent, description, pic,
    } = newCat;
    if (
      name
      && validator.isLength(name, { min: 0, max: 20 })
      && parent
      && parent.trim()
      && description
      && description.trim()
      && pic
      && pic.trim()
      && seo
      && seo.trim()
      && validator.isLength(seo, { min: 0, max: 20 })
    ) {
      const result = await categories.count({
        where: {
          name,
        },
      });
      if (result === 0) {
        const seoName = await categories.count({
          where: {
            seo,
          },
        });
        if (seoName === 0) {
          newCat.seo = newCat.seo.replace(/\s/g, '').toLowerCase();
          categories
            .create(newCat)
            .then(async (finalResult) => {
              const {
                dataValues: { id },
              } = finalResult;
              await homePageLayouts.create({ category_id: id });
              response.status(200).send({
                message:
                  'New Category has been added, Redirect to Category list ...',
              });
            })
            .catch((error) => {
              response.status(500).send({
                message: 'Internal Server Error',
              });
            });
        } else {
          response.status(400).send({
            message: `Category with Seo Name ${seo} is Alreday exist !`,
          });
        }
      } else {
        response.status(400).send({
          message: `Category with name ${name} is Alreday exist !`,
        });
      }
    } else {
      response.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
  } catch (error) {
    console.log(error);
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.delete = (req, res) => {
  try {
    const { id } = req.body;
    categories.destroy({
      where: {
        id,
      },
    });
    res.status(200).send({
      message: 'Success, category is deleted',
    });
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.getCategoty = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categories.findByPk(id);
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(500).send({
        message: 'Category not found',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const {
      data,
      params: { id },
    } = req.body;
    const { name, seo, description } = data;

    if (
      !name.trim()
      || !validator.isLength(name, { min: 1, max: 20 })
      || !seo.trim()
      || !validator.isLength(seo, { min: 1, max: 20 })
      || !description.trim()
    ) {
      res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    } else {
      const categoriesCheck = await categories.findOne({
        where: { $or: [{ name }, { seo }] },
        raw: true,
      });
      if (categoriesCheck && categoriesCheck.id !== parseInt(id, 10)) {
        res.status(400).send({
          message:
            'Sorry !, Category with this Name Or Seo Name is already exist',
        });
      } else {
        data.seo = seo.replace(/\s/g, '').toLowerCase();
        categories.update(data, {
          where: {
            id,
          },
        });
        res.status(200).send({
          message: 'Update is done, Redirect to Category list ...',
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.getCatWithPosts = async (req, res) => {
  try {
    const { limit, offset } = req.query;
    const offSetValue = parseInt(offset, 10) * limit;
    const { seo_name: seo } = req.params;
    const cat = await categories.findOne({ where: { seo }, raw: true });
    if (cat) {
      const { id } = cat;
      const childId = await categories.findAll({
        where: { parent: id }, attributes: ['id'], raw: true, order: [['id', 'DESC']],
      });
      const idArray = [];
      childId.map((element) => {
        idArray.push(element.id);
      });
      idArray.push(id);
      if (limit && offset) {
        const result = await posts.findAndCountAll(
          {
            where: { category_id: idArray, approve: true },
            include: [
              {
                model: categories,
                attributes: [['name', 'category_name'], ['seo', 'category_seo']],
              },
              {
                model: users,
                attributes: [['first', 'last']],
              }],
            limit,
            offset: offSetValue,
            order: [['createdAt', 'DESC']],
          },
        );
        res.status(200).send({ result, catName: cat.name });
      } else {
        const result = await posts.findAndCountAll(
          {
            where: { category_id: idArray },
            include: [
              {
                model: categories,
                attributes: [['name', 'category_name'], ['seo', 'category_seo']],
              },
              {
                model: users,
                attributes: [['first', 'last']],
              },
            ],
            order: [['createdAt', 'DESC']],
          },
        );
        res.status(200).send({ result, catName: cat.name });
      }
    } else {
      res.status(404).send({ message: 'Wrong Category title' });
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};
