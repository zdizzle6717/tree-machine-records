'use strict';

module.exports = function(sequelize, DataTypes) {
  let AlbumRelease = sequelize.define("AlbumRelease", {
    caption: DataTypes.STRING,
    catalogueNumber: {
			type: DataTypes.STRING,
			unique: true
		},
    iTunesUrl: DataTypes.STRING,
    param: {
      type: DataTypes.STRING,
      unique: true
    },
    releaseDate: DataTypes.DATEONLY,
    spotifyUrl: DataTypes.STRING,
    summary: DataTypes.TEXT,
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        AlbumRelease.belongsTo(models.Artist);
        AlbumRelease.hasMany(models.DigitalDownload);
        AlbumRelease.hasMany(models.File);
        AlbumRelease.hasMany(models.MediaMention);
        AlbumRelease.hasMany(models.MerchItem);
        AlbumRelease.hasMany(models.Song);
      }
    }
  });
  return AlbumRelease;
};
