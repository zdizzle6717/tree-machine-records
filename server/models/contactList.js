'use strict';
module.exports = function(sequelize, DataTypes) {
  var ContactList = sequelize.define('ContactList', {
    'bandEmail': DataTypes.STRING,
    'bandPhone': DataTypes.STRING,
    'bandMailingAddress': DataTypes.STRING,
    'bookingManagerEmail': DataTypes.STRING,
    'bookingManagerPhone': DataTypes.STRING,
    'generalManagerEmail': DataTypes.STRING,
    'generalManagerPhone': DataTypes.STRING
  }, {
    'classMethods': {
        associate: function(models) {
            ContactList.belongsTo(models.Artist);
        }
    }
  });
  return ContactList;
};
