'use strict';

module.exports = function (sequelize, DataTypes) {
  var UserNotification = sequelize.define('UserNotification', {
    'type': {
      'type': DataTypes.STRING
    },
    'status': {
      'type': DataTypes.STRING,
      'defaultValue': 'unRead'
    },
    'fromId': {
      'type': DataTypes.INTEGER
    },
    'fromName': {
      'type': DataTypes.STRING
    },
    'fromUsername': {
      'type': DataTypes.STRING
    }
  }, {
    'classMethods': {
      associate: function associate(models) {
        UserNotification.belongsTo(models.User);
      }
    }
  });
  return UserNotification;
};