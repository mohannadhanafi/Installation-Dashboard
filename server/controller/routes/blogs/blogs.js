/* eslint-disable camelcase */
const validator = require('validator');
const { blogs, comments, users } = require('../../../database/modals');

exports.getBySeo = async (request, response) => {
  try {
    const { seo } = request.params;

    const postResult = await blogs.findOne({ where: { seo }, raw: true });
    if (postResult) {
      const { id } = postResult;
      const commentsResult = await comments.findAll({
        where: { post_id: id, approve: '1' },
        order: [['id', 'DESC']],
      });
      response.status(200).send({ postResult, commentsResult });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.getAll = async (request, response) => {
  try {
    const result = await blogs.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: users,
          attributes: ['first'],
        },
      ],
    });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};

exports.changeState = async (request, response) => {
  try {
    const { id, approve } = request.body;
    let changeStateResult;
    if (approve) {
      changeStateResult = await blogs.update(
        { approve: !approve, hero: false },
        { where: { id } },
      );
    } else {
      changeStateResult = await blogs.update(
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
exports.delete = async (request, response) => {
  const { rule, id: userId } = request;
  try {
    const { id } = request.body;
    blogs.destroy({
      where: {
        id,
      },
    });
    response.status(200).send({
      message: 'Blog Deleted',
    });
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
exports.getPost = async (request, response) => {
  const { rule, id: userId } = request;
  try {
    const { id } = request.params;
    const result = await blogs.findAll({
      where: {
        id,
      },
    });

    if (result.length) {
      response.status(200).send(result);
    } else {
      response.status(404).send({
        message: 'Blog not found !',
      });
    }
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
exports.post = async (request, response) => {
  try {
    const data = request.body;
    const { rule } = request;
    const { id } = request;
    console.log(request);
    const {
      title, blog_intro, header_media, description, seo,
    } = data;
    if (
      blog_intro
      && blog_intro.trim()
      && validator.isLength(blog_intro, { min: 0, max: 260 })
      && blog_intro.trim()
      && title
      && title.trim()
      && description
      && description.trim()
      && header_media
      && header_media.length
      && seo
      && validator.isLength(seo, { min: 0, max: 50 })
    ) {
      const auther_id = id;
      const seoName = await blogs.count({ where: { seo } });
      if (seoName === 0) {
        blogs
          .create({
            title,
            header_media,
            post_intro: blog_intro,
            description,
            auther_id,
            approve: true,
            seo: seo.replace(/\s/g, '').toLowerCase(),
          })
          .then(() => {
            response.status(200).send({
              message: 'New Blog Created',
            });
          })
          .catch((error) => {
            response.status(500).send({
              message: 'Internal Server Error',
            });
          });
      } else {
        response.status(401).send({
          message: 'This seo is exists, please add another one',
        });
      }
    } else {
      response.status(401).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
exports.updatePost = async (request, response) => {
  try {
    const { id: userId, rule } = request;
    const {
      data,
    } = request.body;

    const { id } = request.params;
    const {
      post_intro, title, header_media, description, seo,
    } = data;
    if (
      !post_intro.trim()
      || !validator.isLength(post_intro, { min: 0, max: 260 })
      || !title.trim()
      || !validator.isLength(title, { min: 0, max: 150 })
      || !description.trim()
      || !header_media.length
      || !validator.isLength(seo, { min: 0, max: 50 })
    ) {
      response.status(401).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    } else {
      const postCheck = await blogs.findOne({ where: { seo } });
      if (postCheck && postCheck.id !== parseInt(id, 10)) {
        response
          .status(400)
          .send({ message: 'Sorry !, Post with this Seo Name is already exist' });
      } else {
        blogs.update({
          post_intro, title, header_media, description, seo: seo.replace(/\s/g, '').toLowerCase(),
        }, {
          where: {
            id,
          },
        });
        response.status(200).send({
          message: 'Post Updated',
        });
      }
    }
  } catch (error) {
    response.status(500).send({
      message: 'Internal Server Error',
    });
  }
};
