const { Users } = require('../models');

const userData = [
  {
    username: 'Jennifer Wylan',
    email: 'jwylan@gmail.com',
    password: 'ewfchijwnsj',
    image_url: '/assets/fake-pfp/fakeperson1.png',
  },
  {
    username: 'Beau Harding',
    email: 'bhard@gmail.com',
    password: 'exinasjxikxn',
    image_url: '/assets/fake-pfp/fakeperson2.png',
  },
  {
    username: 'Kristin Withers',
    email: 'kwithers@gmail.com',
    password: 'dnckjndlnnx',
    image_url: '/assets/fake-pfp/fakeperson3.png',
  },
  {
    username: 'Brian Wilson',
    email: 'bwill@gmail.com',
    password: 'ncjksdcnsk',
    image_url: '/assets/fake-pfp/fakeperson4.png',
  },
];


const seedUsers = () => Users.create(userData[1]);

module.exports = seedUsers;