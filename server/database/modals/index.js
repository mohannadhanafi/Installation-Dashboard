/* eslint-disable camelcase */
const connection = require('../config');
const services = require('./services');
const titles = require('./titles');
const blogs = require('./blogs');
const hero = require('./hero');
const users = require('./users');
const comments = require('./comments');
const statistics = require('./statistics');
const testimonials = require('./testimonials');
const team = require('./team');
const options = require('./options');
const partners = require('./partners');
const pricingPlans = require('./pricingPlans');
const features = require('./features');
const whyus = require('./whyUs');
const core = require('./core');
const portfolio = require('./portfolio');
const about = require('./about');
const categories = require('./categories');
const posts = require('./posts');
// const plans = require('./pricingPlans');
const notifications = require('./notifications');
// const aboutItem = require('./aboutItem');
// const contact = require('./contact');
const install = require('./install');
const porfolio_category = require('./portfolioCategory');
const contactus = require('./contactus');
const newsletters = require('./newsletters');
const ads = require('./ads');
const galleries = require('./galleries');
const homePageLayouts = require('./homePageLayouts');
const homeLayout = require('./homeLayout');
const threeColumns = require('./threeColumns');


comments.belongsTo(blogs, {
  onDelete: 'CASCADE',
  foreignKey: 'blog_id',
});
blogs.belongsTo(users, {
  onDelete: 'CASCADE',
  foreignKey: 'auther_id',
  targetKey: 'id',
});
portfolio.belongsTo(porfolio_category, {
  onDelete: 'CASCADE',
  foreignKey: 'categoty_id',
  targetKey: 'id',
});
posts.belongsTo(categories, {
  onDelete: 'CASCADE',
  foreignKey: 'category_id',
  targetKey: 'id',
});
categories.hasMany(posts, { foreignKey: 'category_id' });
// aboutItem.belongsTo(about, {
//   onDelete: 'CASCADE',
//   foreignKey: 'about_id',
//   targetKey: 'id',
// });
// portfolio.belongsTo(services, {
//   onDelete: 'CASCADE',
//   foreignKey: 'service_id',
//   targetKey: 'id',
// });
// });
// plans.belongsTo(categories, {
//   onDelete: 'CASCADE',
//   foreignKey: 'category_id',
//   targetKey: 'id',
//   targetKey: 'id',
// });
notifications.belongsTo(users, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id',
  targetKey: 'id',
});
threeColumns.belongsTo(homeLayout, { foreignKey: 'homepage_id' });
threeColumns.belongsTo(categories, { foreignKey: 'category_id' });
homeLayout.belongsTo(categories, { foreignKey: 'category_id' });
homeLayout.hasMany(threeColumns, { foreignKey: 'homepage_id' });
comments.belongsTo(posts, {
  onDelete: 'CASCADE',
  foreignKey: 'post_id',
  targetKey: 'id',
});

posts.belongsTo(users, {
  onDelete: 'CASCADE',
  foreignKey: 'auther_id',
  targetKey: 'id',
});

module.exports = {
  connection,
  users,
  hero,
  statistics,
  testimonials,
  team,
  options,
  pricingPlans,
  install,
  categories,
  posts,
  // plans,
  blogs,
  galleries,
  comments,
  // clients,
  services,
  titles,
  notifications,
  features,
  partners,
  core,
  about,
  // aboutItem,
  whyus,
  portfolio,
  // contact,
  porfolio_category,
  contactus,
  newsletters,
  ads,
  homePageLayouts,
  homeLayout,
  threeColumns,
};
