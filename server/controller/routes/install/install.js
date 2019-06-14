const bcryptjs = require('bcryptjs');
const {
  users, options, install, about, whyus, titles, rebuild, galleries, homeLayout,
} = require('../../../database/modals');

exports.getTables = async (request, response) => {
  try {
    const tablesResult = await install.findAll({ attributes: ['tablename'] });
    response.status(200).send(tablesResult);
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
exports.installCheck = async (request, response) => {
  try {
    const schemas = await install.count();
    if (schemas === 0) {
      return response.status(200).send({ check: true });
    }
    return response.status(200).send({ check: false });
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};

exports.install = async (request, response) => {
  try {
    const schemas = await install.count();
    if (schemas === 0) {
      const {
        email, password, pic, tables, siteType, adress, name,
      } = request.body;
      tables.push('rebuild');
      if (email && email.trim() && password && password.trim()) {
        await about.create({ title: 'About Us', subtitle: 'About Us Subtitle', desc: 'About Us Description' });
        await whyus.create({ title: 'Why Us', subtitle: 'Why Us Subtitle', desc: 'Why Us Description' });
        await options.create({
          active: false, logo: pic, type: siteType, address: adress, category_layout: 1, name,
        });
        await titles.create({ servicetitle: 's' });
        const array = [];
        array.push(pic);
        await galleries.create({ pic: array });
        await homeLayout.create({ type: 's' });
        if (tables.length > 0) {
          await install.create({ tablename: siteType });
          Promise.all(tables.map(async (table) => {
            await install.create({ tablename: table });
          }));
          bcryptjs.hash(password, 10, async (err, hash) => {
            if (err) {
              response.status(500).send('Internal Server Error');
            } else {
              await users.create({
                first: 'admin',
                email,
                username: 'admin',
                password: hash,
                rule: 'admin',
              });
              options.update({
                copyrights: 's',
              }, { where: { } }).then(() => {
                response.status(200).send({ message: 'Success, Redirect to login page' });
              });
            }
          });
        } else {
          return response.status(400).send({ message: 'Wrong,  Choose at least one section!' });
        }
      } else {
        return response.status(400).send({ message: 'Wrong, Empty Email or Password !' });
      }
    } else {
      return response.status(500).send({ message: 'Unauthorized !' });
    }
  } catch (error) {
    return response.status(500).send({ message: 'Internal Server Error' });
  }
};
