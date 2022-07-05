'use strict';
const bcrypt = require('bcryptjs');
// const {Validator } = require('sequelize');

const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    toSafeObject(){
      // we are only extract the 3 necessary fields when they create and send us the instance
      const {id, username, email} = this;
      return {id, username, email};
    }

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    static getCurrentUserById(id){
      return User.scope("currentUser").findByPk(id)
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }



    static associate(models) {
      // define association here
      // added here
      // User.hasMany(models.Spot, {foreignKey: 'ownerId', onDelete: 'CASCADE', hooks:true})
      // User.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'CASCADE', hooks:true})
    }
  }
  User.init({
    username: {
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4,30],
        // isEmail:false
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        // why does this not work???
        // isEmail: true
      },
    },
    hashedPassword: {
      type:DataTypes.STRING.BINARY,
      allowNull: false,
      validate:{
        len: [60,60]
      }
    },
    // firstName: {
    //   type: DataTypes.STRING
    // },
    // lastName: {
    //   type: DataTypes.STRING
    // }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword','email', 'createdAt', "updatedAt"]
      }
    },
    scopes:{
      currentUser(){
        return {
          attributes: {
            exclude: ['hashedPassword']
          }
        }
      },
      loginUser(){
        return {
          // can we clarify this part..
          attributes: {}
        }
      }
    }

  });
  return User;
};
