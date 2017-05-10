'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserMessage = sequelize.define('UserMessage', {
    'status': DataTypes.STRING
  }, {
    'classMethods': {
      associate: function associate(models) {
        UserMessage.belongsTo(models.User);
      }
    }
  });
  return UserMessage;
};