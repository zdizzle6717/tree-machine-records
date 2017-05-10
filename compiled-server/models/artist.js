'use strict';

module.exports = function (sequelize, DataTypes) {
  var Artist = sequelize.define("Artist", {
    'name': DataTypes.STRING,
    'param': {
      'type': DataTypes.STRING,
      'unique': true
    },
    'isCurrent': DataTypes.BOOLEAN
  }, {
    'classMethods': {
      associate: function associate(models) {
        Artist.hasMany(models.AlbumRelease);
        Artist.hasOne(models.BioSection);
        Artist.hasOne(models.ContactList);
        Artist.hasMany(models.DigitalDownload);
        Artist.hasMany(models.EmbeddableMedia);
        Artist.hasMany(models.File);
        Artist.hasMany(models.MediaMention);
        Artist.hasMany(models.MerchItem);
        Artist.hasOne(models.Origin);
        Artist.hasOne(models.Song, {
          as: 'FeaturedTrack'
        });
        Artist.hasOne(models.SocialLinkList);
        Artist.hasOne(models.User);
      }
    }
  });
  return Artist;
};