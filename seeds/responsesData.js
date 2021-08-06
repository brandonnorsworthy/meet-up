const { Responses } = require('../models');

const responsesData = [
  {
    response: 'Im in!! Cant wait!!',
    user_id: 1,
    post_id: 4
  },
  {
    response: 'Woop woop, ready to hang out!',
    user_id: 2,
    post_id: 3
  },
  {
    response: 'Im down like a rodeo clown!',
    user_id: 3,
    post_id: 2
  },
  {
    response: 'Im in there like swimwear!',
    user_id: 4,
    post_id: 1
  },  {
    response: 'weeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
    user_id: 1,
    post_id: 1
  },
  {
    response: 'raggggggggggggggggggggggggggs!',
    user_id: 2,
    post_id: 2
  },
  {
    response: 'comment going here bruhv!',
    user_id: 3,
    post_id: 2
  },
  {
    response: '123312312312312312!',
    user_id: 4,
    post_id: 4
  },
];


const seedresponses = () => Responses.bulkCreate(responsesData);

module.exports = seedresponses;