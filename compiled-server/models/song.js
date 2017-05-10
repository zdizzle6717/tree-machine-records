'use strict';

module.exports = function (sequelize, DataTypes) {
  var Song = sequelize.define('Song', {
    'title': DataTypes.STRING,
    'fileName': DataTypes.STRING
  }, {
    'classMethods': {
      associate: function associate(models) {
        Song.hasOne(models.File);
        Song.belongsTo(models.AlbumRelease);
      }
    }
  });
  return Song;
};