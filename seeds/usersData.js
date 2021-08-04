const { Users } = require('../models');

const userData = [
  {
    username: 'Jennifer Wylan',
    email: 'jwylan@gmail.com',
    password: 'ewfchijwnsj',
    image_url: 'image (3).jpeg',
  },
  {
    username: 'Beau Harding',
    email: 'bhard@gmail.com',
    password: 'exinasjxikxn',
    image_url: 'image (2).jpeg',
  },
  {
    username: 'Kristin Withers',
    email: 'kwithers@gmail.com',
    password: 'dnckjndlnnx',
    filename: 'image (4).jpeg',
  },
  {
    username: 'Brian Wilson',
    email: 'bwill@gmail.com',
    password: 'ncjksdcnsk',
    filename: 'image.jpeg',
  },
];


const seedUsers = () => Users.bulkCreate(userData);

module.exports = seedUsers;