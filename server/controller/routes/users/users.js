const bcryptjs = require('bcryptjs');
const validator = require('validator');
const { users } = require('../../../database/modals');

exports.getAll = async (request, response) => {
  try {
    const result = await users.findAll({ order: [['id', 'DESC']] });
    response.status(200).send(result);
  } catch (error) {
    response.status(500).send('Server Error');
  }
};

exports.post = async (request, response) => {
  try {
    const { body } = request;
    const {
      email, password, rule, first, last, mobile, address, jobtitle, username, pic,
    } = body;

    if (
      email
      && email.trim()
      && password
      && rule
      && first
      && pic
      && password.trim() && password.match('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$')
      && rule.trim()
      && first.trim()
      && pic.trim()
    ) {
      const result = await users.count({ where: { email } });
      const resultUsername = await users.count({ where: { username } });
      if (result !== 0) {
        return response.status(400).send({ message: 'Email is already exist !' });
      } if (resultUsername !== 0) {
        return response.status(400).send({ message: 'username is already exist !' });
      }
      bcryptjs.hash(password, 10, async (err, hash) => {
        if (err) {
          response.status(500).send('Internal Server Error');
        }
        const newUser = {
          first,
          email,
          password: hash,
          rule,
          pic,
          last,
          mobile,
          address,
          jobtitle,
          username,
        };
        await users.create(newUser);
        response
          .status(200)
          .send({ message: 'User Added' });
      });
    } else {
      response.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
  } catch (error) {
    response.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.delete = (req, res) => {
  try {
    const { id } = req.body;
    users.destroy({ where: { id } });
    res.status(200).send({ message: 'User Deleted' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await users.findById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const {
      data,
      params: { id },
    } = req.body;

    const {
      email, password, rule, first, last, mobile, address, jobtitle, username, pic,
    } = data;

    if (
      email && email.trim()
      && first && first.trim()
     && last && last.trim()
     && username && username.trim()
      && validator.isLength(first, { min: 1, max: 50 })
      && validator.isLength(last, { min: 1, max: 50 })

    ) {
      const checkEmail = await users.findOne({ where: { email }, raw: true });
      const checkUsername = await users.findOne({ where: { username }, raw: true });

      if (checkEmail && checkEmail.id !== parseInt(id, 10)) {
        res
          .status(400)
          .send({ message: 'Sorry !, this email is already exist' });
      } else if (checkUsername && checkUsername.id !== parseInt(id, 10)) {
        return res.status(400).send({ message: 'username is already exist !' });
      } else if (!data.password) {
        users.update(data, {
          where: { id },
        });
        res.status(200).send({ message: 'Updated is done' });
      } else if (data.password.trim()) {
        bcryptjs.hash(data.password, 10, (err, hashedPass) => {
          if (err) {
            res.status(500).send({ message: 'Internal server Error' });
          }
          data.password = hashedPass;
          users.update(data, {
            where: { id },
          });
          res.status(200).send({ message: 'Updated is done' });
        });
      } else {
        res.status(400).send({
          message: 'Invalid inputs, enter a valid Password',
        });
      }
    } else {
      res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


exports.getDetailsUser = async (req, res) => {
  try {
    const { id } = req;
    const result = await users.findAll({ attributes: ['first', 'pic', 'id'], where: { id } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getProfile = async (req, res) => {
  try {    
    const { id } = req;
    const result = await users.findById(id);
    res.status(200).send(result);
  } catch (error) {   
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { id, body: { data } } = req;
    const {
      email, password, rule, first, last, mobile, address, jobtitle, username, pic,
    } = data;
    if (
      email && email.trim()
      && first && first.trim()
     && last && last.trim()
     && username && username.trim()
      && validator.isLength(first, { min: 1, max: 50 })
      && validator.isLength(last, { min: 1, max: 50 })

    ) {
      const checkUsername = await users.findOne({ where: { username }, raw: true });
      const checkEmail = await users.findOne({ where: { email }, raw: true });
      const user = await users.findOne({ where: { id }, raw: true });
      if (user.rule === 'admin') {
        if (checkEmail && checkEmail.id !== parseInt(id, 10)) {
          res
            .status(400)
            .send({ message: 'Sorry !, this email is already exist' });
        } else if (checkUsername && checkUsername.id !== parseInt(id, 10)) {
          return res.status(400).send({ message: 'username is already exist !' });
        } else
        if (!data.password) {
          const obj = {
            first,
            last,
            email,
            mobile,
            jobtitle,
            username,
            address,
          };
          if (pic) {
            obj.pic = pic;
          }
          users.update(obj, {
            where: { id },
          });
          res.status(200).send({ message: 'Updated is done' });
        } else if (data.password.trim()) {
          bcryptjs.hash(data.password, 10, (err, hashedPass) => {
            if (err) {
              res.status(500).send({ message: 'Internal server Error' });
            }
            data.password = hashedPass;
            const password = hashedPass;
            const obj = {
              first,
              last,
              email,
              mobile,
              jobtitle,
              address,
              username,
              password,
            };
            if (pic) {
              obj.pic = pic;
            }
            users.update(obj, {
              where: { id },
            });
            res.status(200).send({ message: 'Updated is done' });
          });
        } else {
          res.status(400).send({
            message: 'Invalid inputs, enter a valid Password',
          });
        }
      } else {
        const obj = {
          first,
          last,
          mobile,
          username,
          jobtitle,
          address,
        };
        if (pic) {
          obj.pic = pic;
        }
        users.update(obj, {
          where: { id },
        });
        res.status(200).send({ message: 'Updated is done' });
      }
    } else {
      res.status(400).send({
        message: 'Invalid inputs, please note the type of each input',
      });
    }
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
