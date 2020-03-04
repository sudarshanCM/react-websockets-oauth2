'use strict';
module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    sender: DataTypes.STRING,
    receiver: DataTypes.STRING,
    message: DataTypes.TEXT
  }, {});
  messages.associate = function(models) {
    // associations can be defined here
  };
  return messages;
};