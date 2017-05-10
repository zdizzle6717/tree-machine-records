'use strict';

module.exports = function (sequelize, DataTypes) {
  var FeaturedAlbumList = sequelize.define('FeaturedAlbumList', {
    'albumReleaseIds': DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    'classMethods': {}
  });
  return FeaturedAlbumList;
};