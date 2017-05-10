'use strict';
module.exports = function(sequelize, DataTypes) {
  var MediaMention = sequelize.define('MediaMention', {
    'author': DataTypes.STRING,
    'date': DataTypes.DATEONLY,
    'linkUrl': DataTypes.STRING,
    'title': DataTypes.STRING,
    'text': DataTypes.STRING
  }, {
    'classMethods': {
      associate: function(models) {
        MediaMention.belongsTo(models.Artist);
        MediaMention.belongsTo(models.AlbumRelease);
      }
    }
  });
  return MediaMention;
};
