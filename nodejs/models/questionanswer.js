'use strict';
module.exports = (sequelize, DataTypes) => {
  const QuestionAnswer = sequelize.define('QuestionAnswer', {
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    options: {
      type: DataTypes.TEXT,
      get: function() {
        return JSON.parse(this.getDataValue("options"));
      },
      set: function(value) {
        return this.setDataValue("options", JSON.stringify(value));
      }
    }
  }, {});
  QuestionAnswer.associate = function(models) {
    // associations can be defined here
  };
  return QuestionAnswer;
};