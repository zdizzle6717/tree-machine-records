'use strict';
module.exports = function(sequelize, DataTypes) {
  var Origin = sequelize.define('Origin', {
    'city': DataTypes.STRING,
    'stateProvince': DataTypes.STRING,
    'stateProvinceCode': DataTypes.STRING,
    'country': DataTypes.STRING,
	'countryCode': DataTypes.STRING
  }, {
    'classMethods': {
        associate: function(models) {
            Origin.belongsTo(models.Artist);
        }
    }
  });
  return Origin;
};
