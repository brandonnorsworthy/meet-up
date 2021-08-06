const { Posts } = require('../models');

const postsData = [
  {
    id: 1,
    title: 'BBQ At My House!!',
    description: 'Hey gang! Im having a BBQ at my house! I hope all can attend!!',
    upvotes: 44,
    location: "2113 Main St. Austin, TX.",
    time_occuring: "13:00:00",
    date_occuring: "August 04, 2021",
    user_id: 1,
    edited: false
  },
  {
    id: 2,
    title: 'Meet Up At The Brewery!!',
    description: 'Hey guys! Lets meet up at the brewery!!',
    upvotes: 0,
    location: "700 Duvall St. Austin, TX.",
    time_occuring: "16:00:00",
    date_occuring: "August 05, 2021",
    user_id: 2,
    edited: true
  },
  {
    id: 3,
    title: 'Frisbee In The Park!!',
    description: 'Lets toss around the frisbee!!',
    upvotes: 123,
    location: "2336 Douglas St. Austin, TX.",
    time_occuring: "12:00:00",
    date_occuring: "August 06, 2021",
    user_id: 3,
    edited: false
  },
  {
    id: 4,
    title: 'Softball Game!',
    description: 'Hey gang! Lets meet up at the ballpark for a softball game!!',
    upvotes: 3,
    location: "420 Green St. Austin, TX.",
    time_occuring: "13:00:00",
    date_occuring: "August 07, 2021",
    user_id: 3,
    edited: false
  },
]

const seedposts = () => Posts.bulkCreate(postsData);

module.exports = seedposts;