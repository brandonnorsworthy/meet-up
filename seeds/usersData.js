const { Users } = require('../models');

const userData = [
  {
    username: 'jenniferwylan1983',
    email: 'jwylan@gmail.com',
    password: 'ewfchijwnsj',
    image_url: 'https://res.cloudinary.com/meet-up/image/upload/v1628415046/xhlsl4wxyslcebyjjmtc.bmp',
  },
  {
    username: 'BeauHarding',
    email: 'bhard@gmail.com',
    password: 'exinasjxikxn',
    image_url: '/assets/fake-pfp/fakeperson2.png',
  },
  {
    username: 'KristinWithers',
    email: 'kwithers@gmail.com',
    password: 'dnckjndlnnx',
    image_url: '/assets/fake-pfp/fakeperson3.png',
  },
  {
    username: 'BrianWilson',
    email: 'bwill@gmail.com',
    password: 'ncjksdcnsk',
    image_url: '/assets/fake-pfp/fakeperson4.png',
  },
];


const seedUsers = () => Users.create(userData[0]);

module.exports = seedUsers;