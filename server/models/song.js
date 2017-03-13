'use strict';

module.exports = function(sequelize, DataTypes) {
  let Song = sequelize.define("Song", {
    title: DataTypes.STRING,
    fileName: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Song.hasOne(models.File);
        Song.belongsTo(models.AlbumRelease);
      }
    }
  });
  return Song;
};
