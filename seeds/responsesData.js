const { Responses } = require('../models');

const responsesData = [
  {
    response: 'Im in!! Cant wait!!',
    user_id: 1,
    post_id: 2
  },
  {
    response: 'Woop woop, ready to hang out!',
    user_id: 2,
    post_id: 3
  },
  {
    response: 'Im down like a rodeo clown!',
    user_id: 3,
    post_id: 4
  },
  {
    response: 'Im in there like swimwear!',
    user_id: 4,
    post_id: 1
  },  {
    response: 'Im in!! Cant wait!!',
    user_id: 1,
    post_id: 2
  },
  {
    response: 'Woop woop, ready to hang out!',
    user_id: 2,
    post_id: 3
  },
  {
    response: 'Im down like a rodeo clown!',
    user_id: 3,
    post_id: 4
  },
  {
    response: 'Im in there like swimwear!',
    user_id: 4,
    post_id: 1
  },
];


const seedresponses = () => Responses.bulkCreate(responsesData);

module.exports = seedresponses;