const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    time_occuring: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    edited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
	user_id: {
	  type: DataTypes.INTEGER,
	  references: {
	    model: 'Users',
		key: 'id',
	},
  },
},
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'Posts',
  }
);

module.exports = Posts;
