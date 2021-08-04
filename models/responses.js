const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class responses extends Model {}

responses.init(
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
	  model: 'users',
	  key: 'id',
	},
},
    posts_id: {
	  type: DataTypes.INTEGER,
	  references: {
	  model: 'posts',
	  key: 'id',
			},
		},
  },
  {
    sequelize,
    underscored: true,
    freezeTableName: true,
    modelName: 'responses',
  }
);

module.exports = responses;