'use strict';
module.exports = (sequelize, DataTypes) => {
  const secret = sequelize.define('secret', {
    email: DataTypes.STRING,
    secretKey: DataTypes.STRING
  }, {});
  secret.associate = function(models) {
    // associations can be defined here
  };
  return secret;
};