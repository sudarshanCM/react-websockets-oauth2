'use strict';
module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define('Scores', {
    email: DataTypes.STRING,
    score: DataTypes.INTEGER
  }, {});
  Scores.associate = function(models) {
    // associations can be defined here
  };
  return Scores;
};