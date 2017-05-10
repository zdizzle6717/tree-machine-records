'use strict';

module.exports = function (sequelize, DataTypes) {
  var DigitalDownload = sequelize.define('DigitalDownload', {
    'title': DataTypes.STRING,
    'fileName': DataTypes.STRING,
    'downloadCodes': DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    'classMethods': {
      associate: function associate(models) {
        DigitalDownload.hasOne(models.File);
        DigitalDownload.belongsTo(models.AlbumRelease);
        DigitalDownload.belongsTo(models.Artist);
      }
    }
  });
  return DigitalDownload;
};