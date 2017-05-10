'use strict';
module.exports = function(sequelize, DataTypes) {
  var FeaturedSongList = sequelize.define('FeaturedSongList', {
    'songIds': DataTypes.ARRAY(DataTypes.INTEGER)
  }, {
    'classMethods': {}
  });
  return FeaturedSongList;
};
