const path = require('path');
const nodemailer = require('nodemailer');
const {
  contactus, users, notifications, options,
} = require('../../../database/modals');
const socket = require('../socket');

exports.get = async (req, res) => {
  try {
    const result = await contactus.findAll({ order: [['id', 'DESC']] });
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.getSendEmail = async (req, res) => {
  try {
    const result = await contactus.findAll({ where: { sent: 1 } });
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.post = async (request, response) => {
  try {
    const { rule } = request;
    const data = request.body;
    const result = await options.findAll({ where: {} });
    const { dataValues } = result[0];
    const { mail, password } = dataValues;
    const {
      subject, message, starred, important, to, label, read, file,
    } = data;
    const { email } = to[0];
    const { name } = to[0];

    const obj = {
      name, subject, message, starred, important, email, label, read,
    };
    obj.sent = 1;

    if (file.length) {
      obj.file = file;
    }
    const paths = [__dirname, '..', '..', '..', '..', 'uploads'];
    const target = file.map(element => (
      path.join(...paths, element)
    ));
    if (
      name
      && name.trim()
      && email
      && email.trim()
      && subject
      && subject.trim()
      && message
      && message.trim()
    ) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: mail,
          pass: password,
        },
      });
      const mailOptions = {
        from: mail,
        to: email,
        replyTo: email,
        subject,
        text: message,
        attachments:
        target.map(element => (
          { path: element })),

      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          response.status(500).send({ message: 'Internal Server Error' });
        } else {
          contactus.create(obj).then(async () => {
            const adminUsers = await users.findAll({
              where: { rule: 'admin' },
              raw: true,
            });
            if (rule !== 'admin') {
              adminUsers.map(async (admin) => {
                const { id: adminId } = admin;
                // await notifications.create({
                //   text: `New Email arrived from ${data.name}`,
                //   seen: false,
                //   user_id: adminId,
                // });
              });
              // socket.io.emit('newEmail', {
              //   message: `New Email arrived from ${data.name}`,
              // });
            }
          });
          response.status(200).send({ message: 'Email has been sent, Thank you' });
        }
      });
    } else {
      response.status(400).send({ message: 'Fill all the fields !' });
    }
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};

exports.editRead = async (request, response) => {
  try {
    const { id } = request.body;
    await contactus.update({ read: true }, { where: { id } });
    response.status(200);
  } catch (error) {
    response.status(500);
  }
};

exports.editStarred = async (request, response) => {
  try {
    const { starred, id } = request.body;
    await contactus.update({ starred: !starred }, { where: { id } });
    response.status(200).send({ message: 'Mail has been updated' });
  } catch (error) {
    console.log(error);
    
    response.status(500).send('Internal Server Error');
  }
};

exports.editImportant = async (request, response) => {
  try {
    const { important, id } = request.body;
    await contactus.update({ important: !important }, { where: { id } });
    response.status(200).send({ message: 'Mail has been updated' });
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};

exports.editDeleted = async (request, response) => {
  try {
    const { deleted, id } = request.body;
    if (deleted) {
      await contactus.update({ deleted: !deleted, folder: 0 }, { where: { id } });
      return response.status(200).send({ message: 'Mail has been updated' });
    }
    await contactus.update({ deleted: !deleted, folder: 1 }, { where: { id } });
    return response.status(200).send({ message: 'Mail has been updated' });
  } catch (error) {
    response.status(500).send('Internal Server Error');
  }
};
