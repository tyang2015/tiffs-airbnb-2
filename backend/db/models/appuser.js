'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class AppUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AppUser.hasMany(models.Spot, {foreignKey: 'ownerId', onDelete: 'CASCADE', hooks:true})
      AppUser.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'CASCADE', hooks:true})

    }
  }
  AppUser.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppUser',
  });
  return AppUser;
};
