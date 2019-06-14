const express = require('express');
const hero = require('./routes/hero');
const services = require('./routes/services');
const titles = require('./routes/titles');
const blogs = require('./routes/blogs');
const statistics = require('./routes/statistics');
const testimonials = require('./routes/testimonials');
const team = require('./routes/team');
const options = require('./routes/options');
const partners = require('./routes/partners');
const Auth = require('./auth');
const users = require('./routes/users');
const file = require('./routes/file');
const pricingPlans = require('./routes/pricingPlans');
const features = require('./routes/features');
const whyUs = require('./routes/whyUs');
const core = require('./routes/core');
const portfolio = require('./routes/portfolio');
const about = require('./routes/about');
const install = require('./routes/install');
const contactus = require('./routes/contactus');
const clients = require('./routes/clients');
const newsletters = require('./routes/newsletters');
const ads = require('./routes/ads');
const galleries = require('./routes/galleries');
const comments = require('./routes/comments');
const posts = require('./routes/posts');
const heading = require('./routes/heading');
const homeLayouts = require('./routes/layouts');
const categories = require('./routes/categories/index');
const rebuild = require('./routes/rebuild');
const notifications = require('./routes/notifications');
const { checkRoute } = require('./checkRoute');

const router = express.Router();

router
  .use('/install', install) // Add to Installs table
  .use('/files', file) // Dealing with files (upload, get, delete)
  .use('/titles', titles) // Titles for Informative sites
  .use('/statistics', statistics) // Manually adding of statistics
  .use('/options', options) // The main options like (logo, social_media, etc..)
  .use('/contactus', contactus) // For contacting visitors with admin and send emails
  .use('/newsletters', newsletters) // Subsecribe users of NewsLetters
  .use('/users', users) // CRUD for users and Admins
  .use('/rebuild', rebuild) // rebuild of the database
  .use('/notification', notifications) // For Notifications
  .use('/pricingPlans', checkRoute, pricingPlans) // Pricing Plans of Informative Websites
  .use('/features', checkRoute, features) // CRUD for features
  .use('/whyUs', checkRoute, whyUs) // CRUD for why us page
  .use('/about', checkRoute, about) // CRUD for about us page
  .use('/core', checkRoute, core) // CRUD for core Items
  .use('/testimonials', checkRoute, testimonials) // CRUD for testimonials
  .use('/hero', checkRoute, hero) // CRUD for hero sections
  .use('/services', checkRoute, services) // CRUD for services
  .use('/blogs', checkRoute, blogs) // CRUD for blogs
  .use('/team', checkRoute, team) // CRUD for team section
  .use('/partners', checkRoute, partners) // CRUD for partners section
  .use('/portfolio', checkRoute, portfolio) // CRUD for portfolio
  .use('/ads', ads) // CRUD for ads section
  .use('/categories', categories) // CRUD for categories
  .use('/gallery', galleries) // CRUD for galleries
  .use('/post', posts) // CRUD for posts
  .use('/heading', heading) // CRUD for heading and hero
  .use('/comments', comments) // CRUD for comments
  .use('/home', homeLayouts) // CRUD for layouts
  .use('/clients', clients);

module.exports = router;
