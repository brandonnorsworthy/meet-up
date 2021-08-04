const { users } = require('../models');

const userdata = [
  {
      username:"Techguy1",
      password:"Jijefhwiueni",
      email:"Techguy1@gmail.com",
      image_url:""
  },
  {
      username:"Techgal2",
      password:"9wcj9iewncoiw",
      email:"Techgal1@gmail.com"
  },
  {
      username:"Wonderboy18",
      password:"ce0j2c0cncas",
      email:"Wonderboy18@gmail.com"
  },
  {
      username:"GOTfan00",
      password:"ndkjcnksdlah",
      email:"GOTfan00@gmail.com"
  },
  {
      username:"TexKing",
      password:"cdsdcscmioq",
      email:"Tex@gmail.com"
},
]
const seedUsers = () => users.bulkCreate(userdata);

module.exports = seedUsers;
