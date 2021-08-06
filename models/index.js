const Users = require('./users');
const Posts = require('./posts');
const Responses = require('./responses');

Users.hasMany(Posts, {
  foreignKey: 'user_id',
});
  
Users.hasMany(Responses, {
  foreignKey: 'user_id',
});
  
Posts.belongsTo(Users, {
  foreignKey: 'user_id',
});

Posts.hasMany(Responses, {
  foreignKey: 'post_id',
});
  
Responses.belongsTo(Posts, {
  foreignKey: 'post_id',
});
  
Responses.belongsTo(Users, {
  foreignKey: 'user_id',
});
  
module.exports = { Users, Posts, Responses };