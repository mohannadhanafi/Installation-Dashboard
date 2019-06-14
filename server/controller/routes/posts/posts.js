/* eslint-disable camelcase */
const validator = require('validator');
const sequelize = require('sequelize');

const {
  posts,
  categories,
  users,
  notifications,
  comments,
} = require('../../../database/modals');
const Sequelize = require('../../../database/config');
const socket = require('../socket');

exports.changeState = async (requeset, response) => {
  try {
    const { id, approve } = requeset.body;
    let changeStateResult;
    if (approve) {
      changeStateResult = await posts.update(
        { approve: !approve, hero: false },
        { where: { id } },
      );
    } else {
      changeStateResult = await posts.update(
        { approve: !approve },
        { where: { id } },
      );
    }
    if (changeStateResult) {
      response.status(200).send({ message: 'Post has been updated ...' });
    } else {
      response.status(500).send('Internal server error');
    }
  } catch (error) {
    response.status(500).send('Internal server error');
  }
};
exports.get = async (req, res) => {
  const { id, rule } = req;

  try {
    if (rule === 'admin') {
      const result = await posts.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: users,
            attributes: ['first', 'last'],
          },
          {
            model: categories,
            attributes: ['name'],
          },
        ],
      });
      res.status(200).send(result);
    } else {
      const result = await posts.findAll({
        order: [['id', 'DESC']],
        where: { auther_id: id },
        include: [
          {
            model: users,
            attributes: ['first', 'last'],
          },
          {
            model: categories,
            attributes: ['name'],
          },
        ],
      });
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
};

exports.delete = async (req, res) => {
  const { rule, id: userId } = req;

  try {
    const { id } = req.body;
    if (rule === 'admin') {
      posts.destroy({
        where: {
          id,
        },
      });
      res.status(200).send({
        message: 'Success, post is deleted',
      });
    } else {
      const post = await posts.findByPk(id, { raw: true });
      if (post.auther_id === userId) {
        posts.destroy({
          where: {
            id,
          },
        });
        res.status(200).send({
          message: 'Deleted !',
        });
      } else {
        res.status(401).send({
          message: "Unauthorized !, you can't delete this post!",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.getPost = async (req, res) => {
  const { rule, id: userId } = req;

  try {
    const { id } = req.params;
    const result = await posts.findAll({
      where: {
        id,
      },
      include: [
        {
          model: categories,
          attributes: ['name'],
        },
      ],
    });

    if (result.length) {
      if (rule === 'admin') {
        res.status(200).send(result);
      } else {
        const post = await posts.findByPk(id, { raw: true });
        if (post.auther_id === userId) {
          res.status(200).send(result);
        } else {
          res.status(401).send({
            message: "Unauthorized !, you can't edit this post!",
          });
        }
      }
    } else {
      res.status(404).send({
        message: 'Post not found !',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.post = async (req, res) => {
  try {
    const data = req.body;
    const { rule } = req;
    const { id } = req;
    const {
      title,
      seo,
      post_intro,
      category: category_id,
      header_media,
      description,
      tags,
      breaking,
    } = data;
    let heroValue;
    if (rule === 'admin') {
      const { hero } = data;
      heroValue = hero;
    }
    if (
      post_intro
      && post_intro.trim()
      && validator.isLength(post_intro, { min: 0, max: 260 })
      && seo
      && post_intro.trim()
      && validator.isLength(seo, { min: 0, max: 20 })
      && title
      && title.trim()
      && category_id
      && category_id.trim()
      && description
      && description.trim()
      && header_media
      && header_media.length
    ) {
      const result = await posts.count({
        where: {
          seo,
        },
      });
      if (result === 0) {
        const auther_id = id;

        posts
          .create({
            title,
            seo: seo.replace(/\s/g, '').toLowerCase(),
            category_id,
            header_media,
            post_intro,
            description,
            auther_id,
            hero: heroValue,
            approve: rule === 'admin',
            tags,
            breaking,
          })
          .then(async () => {
            const adminUsers = await users.findAll({
              where: { rule: 'admin' },
              raw: true,
            });

            if (rule !== 'admin') {
              adminUsers.map(async (admin) => {
                const { id: adminId } = admin;
                await notifications.create({
                  text: "New Post Added, it's waiting your approve ...",
                  seen: false,
                  user_id: adminId,
                });
              });
              socket.io.emit('newPost', {
                message: "New Post Added, it's waiting your approve ...",
              });
            }

            res.status(200).send({
              message: 'New post has been added, Redirect to Posts list ...',
            });
          })
          .catch((error) => {
            res.status(500).send({
              message: 'Internal Server Error',
            });
          });
      } else {
        res.status(400).send({
          message: 'The seo name is Alreday exist !',
        });
      }
    } else {
      res.status(401).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id: userId, rule } = req;
    const {
      data,
      params: { id },
    } = req.body;

    const {
      post_intro,
      seo,
      title,
      header_media,
      description,
      breaking,
    } = data;
    if (
      !post_intro.trim()
      || !validator.isLength(post_intro, { min: 0, max: 260 })
      || !seo.trim()
      || !validator.isLength(seo, { min: 0, max: 20 })
      || !title.trim()
      || !description.trim()
      || !header_media.length
    ) {
      res.status(401).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    } else {
      const postCheck = await posts.findOne({ where: { seo } });
      if (postCheck && postCheck.id !== parseInt(id, 10)) {
        res
          .status(400)
          .send({
            message: 'Sorry !, Post with this Seo Name is already exist',
          });
      } else if (rule === 'admin') {
        data.seo = seo.replace(/\s/g, '');
        posts.update(data, {
          where: {
            id,
          },
        });
        res.status(200).send({
          message: 'Update is done, Redirect to Posts list ...',
        });
      } else {
        const post = await posts.findByPk(id, { raw: true });
        if (post.auther_id === userId) {
          data.seo = seo.replace(/\s/g, '').toLowerCase();
          posts.update(data, {
            where: {
              id,
            },
          });
          res.status(200).send({
            message: 'Update is done, Redirect to Posts list ...',
          });
        } else {
          res.status(401).send({
            message: "Unauthorized !, you can't edit this post !",
          });
        }
      }
    }
  } catch (error) {
    res.status(500).send({
      message: 'Internal Server Error',
    });
  }
};

exports.postSeo = async (req, res) => {
  try {
    const { seo, catSeo } = req.params;

    const result = await posts.findAll({
      where: {
        seo,
        approve: true,
      },
      include: [
        {
          model: categories,
          attributes: ['name'],
          where: { seo: catSeo },
        },
        {
          model: users,
          attributes: ['first', 'last', 'pic', 'bio'],
        },
      ],
    });
    if (result[0]) {
      const { id, views } = result[0];
      await posts.update({ views: views + 1 }, { where: { id } });
      const commentsResult = await comments.findAll({
        where: { post_id: id, approve: '1' },
        order: [['id', 'DESC']],
      });

      const next = await Sequelize.query(
        `select posts.*, categories.name as category_name, categories.seo as cat_seo from posts join categories on categories.id = posts.category_id where posts.id = (select min(id) from posts where id > ${id})`,
      );
      const prev = await Sequelize.query(
        `select posts.*, categories.name as category_name, categories.seo as cat_seo from posts join categories on categories.id = posts.category_id where posts.id = (select max(id) from posts where id < ${id})`,
      );
      const nextPost = next[0];
      const prevPost = prev[0];
      res.status(200).send({
        result,
        nextPost,
        prevPost,
        commentsResult,
      });
    } else {
      res.status(404).send({ message: 'Wrong news title !' });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.lastPosts = async (req, res) => {
  try {
    const postsData = await posts.findAll({
      where: { approve: true },
      order: [['id', 'DESC']],
      limit: 5,
      include: [
        {
          model: categories,
          attributes: ['seo'],
        },
      ],
    });
    res.status(200).send(postsData);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.trendingPosts = async (request, response) => {
  try {
    const Trending = await posts.findAll({
      limit: 10,
      order: [['views', 'DESC']],
      include: [
        {
          model: categories,
          attributes: ['name', 'seo'],
        },
        {
          model: users,
          attributes: ['first', 'last', 'pic', 'bio'],
        },
      ],
    });
    const mostCategories = await posts.findAll({
      attributes: [
        [sequelize.fn('sum', sequelize.col('views')), 'totalviews'],
        'category_id',
      ],
      group: ['category_id'],
      raw: true,
      limit: 4,
      order: sequelize.literal('totalviews DESC'),
    });
    const finalData = await Promise.all(mostCategories.map(async (category) => {
      const { category_id } = category;
      const categoryPosts = await posts.findAll({
        where: { category_id },
        include: [
          {
            model: categories,
            attributes: ['name', 'seo'],
          },
          {
            model: users,
            attributes: ['first', 'last', 'pic', 'bio'],
          },
        ],
      });
      const categoryDetails = await categories.findOne({ where: { id: category_id } });
      return { categoryPosts, categoryDetails };
    }));
    response.send({ finalData, Trending });
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
