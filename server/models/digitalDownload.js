'use strict';

module.exports = function(sequelize, DataTypes) {
  let DigitalDownload = sequelize.define('DigitalDownload', {
    'title': DataTypes.STRING,
    'fileName': DataTypes.STRING,
    'downloadCodes': DataTypes.ARRAY(DataTypes.TEXT)
  }, {
    'classMethods': {
      associate: function(models) {
        DigitalDownload.hasOne(models.File);
        DigitalDownload.belongsTo(models.AlbumRelease);
        DigitalDownload.belongsTo(models.Artist);
      }
    }
  });
  return DigitalDownload;
};
