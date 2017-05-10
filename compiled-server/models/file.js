'use strict';

module.exports = function (sequelize, DataTypes) {
  var File = sequelize.define("File", {
    'locationUrl': DataTypes.STRING,
    'label': DataTypes.STRING,
    'name': DataTypes.STRING,
    'size': DataTypes.INTEGER,
    'type': DataTypes.STRING,
    'identifier': {
      'type': DataTypes.STRING,
      'defaultValue': 'default'
    }
  }, {
    'classMethods': {
      associate: function associate(models) {
        File.belongsTo(models.AlbumRelease);
        File.belongsTo(models.Artist);
        File.belongsTo(models.DigitalDownload);
        File.belongsTo(models.MerchItem);
        File.belongsTo(models.Song);
        File.belongsTo(models.User);
      }
    }
  });
  return File;
};