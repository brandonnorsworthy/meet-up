const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Responses extends Model {}

Responses.init(
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
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
	  user_id: {
	  type: DataTypes.INTEGER,
	  references: {
	  model: 'Users',
	  key: 'id',
      },
    },
    posts_id: {
	  type: DataTypes.INTEGER,
	  references: {
	  model: 'Posts',
	  key: 'id',
			},
		},
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'Responses',
  }
);

module.exports = Responses;