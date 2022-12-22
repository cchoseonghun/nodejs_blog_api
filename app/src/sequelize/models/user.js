'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Token, { foreignKey: "userId" });
      this.hasMany(models.Post, { foreignKey: "userId" });
      this.hasMany(models.Comment, { foreignKey: "userId" });
      this.hasMany(models.Like, { foreignKey: "userId" });
    }
  }
  User.init({
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nickname: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};