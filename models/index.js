const Users = require('./Users');
const Posts = require('./Posts');
const Responses = require('./Responses');

Users.hasMany(Posts, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
  
Users.hasMany(Responses, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
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
  
