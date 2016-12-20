'use strict';
module.exports = function(sequelize, DataTypes) {
  var BioSection = sequelize.define('BioSection', {
    content: DataTypes.ARRAY(DataTypes.TEXT),
    sourceName: DataTypes.STRING,
    sourceUrl: DataTypes.STRING,
  }, {
    classMethods: {
        associate: function(models) {
            BioSection.belongsTo(models.Artist);
        }
    }
  });
  return BioSection;
};
