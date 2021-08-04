const users = require('./users');
const posts = require('./posts');
const responses = require('./responses');

users.hasMany(posts, {
  foreignKey: 'user_id',
});
  
users.hasMany(responses, {
  foreignKey: 'user_id',
});
  
posts.belongsTo(users, {
  foreignKey: 'user_id',
});

posts.hasMany(responses, {
  foreignKey: 'post_id',
});
  
responses.belongsTo(posts, {
  foreignKey: 'post_id',
});
  
responses.belongsTo(users, {
  foreignKey: 'user_id',
});
  
module.exports = { users, posts, responses };
  
