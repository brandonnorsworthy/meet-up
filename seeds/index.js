const sequelize = require('../config/connection');
const seedUsers = require('./usersData')
const seedPosts = require('./PostsData');
const seedResponses = require('./responsesData');


const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUsers();

  await seedPosts();

  await seedResponses();

  process.exit(0);
};

seedAll();

