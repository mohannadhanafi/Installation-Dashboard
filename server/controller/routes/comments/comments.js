const cookieParse = require('cookie');
const { verify } = require('jsonwebtoken');
const validator = require('validator');
const {
  comments,
  blogs,
  notifications,
  posts,
  categories,
} = require('../../../database/modals');

exports.get = async (request, response) => {
  try {
    const result = await comments.findAll({
      order: [['id', 'DESC']],
      include: [{ model: blogs }],
    });
    return response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Server Error');
  }
};

exports.post = async (request, response) => {
  try {
    const {
      seo, body, name, email,
    } = request.body;
    const postId = await blogs.findOne({ where: { seo }, raw: true, attributes: ['id'] });
    if (postId) {
      const { id } = postId;
      const newComment = {
        body, name, email, post_id: id,
      };
      await comments.create(newComment);
      response.status(200).send({ message: 'Your comment has been added, just wait for the approve' });
    } else {
      response.status(400).send('Blog not exist');
    }
  } catch (error) {
    response.status(500).send('Server Error');
  }
};
exports.delete = async (req, res) => {
  try {
    const {
      id,
    } = req.body;

    await comments.destroy({ where: { id } });
    res.status(200).send({ message: 'Comment Deleted' });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

exports.update = async (req, res) => {
  try {
    const {
      data: { id },
    } = req.body;
    const commentData = await comments.findByPk(id, {
      attributes: ['approve'],
      raw: true,
    });
    const { approve } = commentData;
    if (approve === '0') {
      await comments.update({ approve: '1' }, { where: { id } });
      res.status(200).send({ message: 'Comment Updated' });
    } else if (approve === '1') {
      await comments.update({ approve: '0' }, { where: { id } });
      res.status(200).send({ message: 'Comment Updated' });
    } else {
      res.status(500).send('Internal server error');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};


const socket = require('../socket');

const notify = (request, response, clients, cb) => {
  try {
    clients.map((client) => {
      const token = cookieParse.parse(client.cookie);
      const { jwt } = token;
      if (jwt) {
        verify(jwt, process.env.SECRET, (error, result) => {
          if (result) {
            const { id } = result;
            client.userId = id;
          }
        });
      }
    });
    cb(null, clients);
  } catch (error) {
    cb(error);
  }
};
exports.getN = async (request, response) => {
  try {
    const { id, rule } = request;
    if (rule !== 'admin') {
      const result = await comments.findAll({
        order: [['id', 'DESC']],
        include: [{ model: posts, include: [{ model: categories }] }],
      });
      return response.status(200).send(result);
    }
    const postsResult = await posts.findAll({
      where: { auther_id: id },
      attributes: ['id'],
      raw: true,
    });
    const postArray = postsResult.map(post => post.id);
    const result = await comments.findAll({
      where: { post_id: { $in: postArray } },
      order: [['id', 'DESC']],
      include: [{ model: posts, include: [{ model: categories }] }],
    });
    return response.status(200).send(result);
  } catch (error) {
    console.log(error);
    response.status(500).send('Server Error');
  }
};

exports.postN = async (request, response) => {
  try {
    const {
      comment, username, email, post_id,
    } = request.body;
    const newComment = {
      title: comment,
      email,
      approve: 0,
      username,
      post_id,
    };
    if (
      comment
      && comment.trim()
      && username
      && username.trim()
      && email
      && email.trim()
    ) {
      const checkEmail = validator.isEmail(email);
      if (checkEmail) {
        const newCommentResult = await comments.create(newComment, {
          returning: true,
          raw: true,
        });
        const {
          dataValues: { post_id: postId },
        } = newCommentResult;
        const { clients } = socket;
        const userPostId = await posts.findOne({
          where: { id: post_id },
          attributes: ['auther_id'],
          raw: true,
        });
        await notifications.create({
          text: `New Comment Arrived from ${email}`,
          seen: false,
          user_id: userPostId.auther_id,
        });
        // notify(request, response, clients, (error, result) => {
        //   if (result) {
        //     result.map((user) => {
        //       if (user.userId) {
        //         if (user.userId === userPostId.auther_id) {
        //           socket.io
        //             .to(user.id)
        //             .emit('newComment', {
        //               message: `New Comment Arrived from ${email}`,
        //             });
        //         }
        //       }
        //     });
        //   }
        // });

        response
          .status(200)
          .send({ message: 'New Comment Added', newCommentResult });
      } else {
        response.status(401).send({ message: 'Enter Vaild Email' });
      }
    } else {
      response.status(401).send({ message: 'Fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send('Server Error');
  }
};
exports.deleteN = async (req, res) => {
  try {
    const {
      data: { id },
    } = req.body;
    await comments.destroy({ where: { id } });
    res.status(200).send({ message: 'Success, comment is deleted' });
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

exports.updateN = async (req, res) => {
  try {
    const {
      data: { id },
    } = req.body;
    const commentData = await comments.findByPk(id, {
      attributes: ['approve'],
      raw: true,
    });
    const { approve } = commentData;
    if (approve === '0') {
      await comments.update({ approve: '1' }, { where: { id } });
      res.status(200).send({ message: 'Comment has been updated' });
    } else if (approve === '1') {
      await comments.update({ approve: '0' }, { where: { id } });
      res.status(200).send({ message: 'Comment has been updated' });
    } else {
      res.status(500).send('Internal server error');
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};
