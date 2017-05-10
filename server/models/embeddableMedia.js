'use strict';
module.exports = function(sequelize, DataTypes) {
  var EmbeddableMedia = sequelize.define('EmbeddableMedia', {
    'title': DataTypes.STRING,
    'type': DataTypes.STRING,
    'linkUrl': DataTypes.STRING,
    'embedUrl': DataTypes.STRING
  }, {
    'classMethods': {
        associate: function(models) {
            EmbeddableMedia.belongsTo(models.Artist);
        }
    }
  });
  return EmbeddableMedia;
};
