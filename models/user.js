'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    display_name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};