'use strict';
module.exports = function(sequelize, DataTypes) {
  var MerchItem = sequelize.define('MerchItem', {
	  // TODO: Added properties for Merch
    title: DataTypes.STRING,
    price: DataTypes.STRING,
    shortDescription: DataTypes.STRING,
    description: DataTypes.STRING,
    sku: {
			type: DataTypes.STRING,
			unique: true
		},
    qty: DataTypes.INTEGER,
    format: DataTypes.STRING,
    isDisplayed: DataTypes.BOOLEAN,
    isFeatured: DataTypes.BOOLEAN
  }, {
    classMethods: {
        associate: function(models) {
            MerchItem.hasMany(models.File);
            MerchItem.belongsTo(models.Artist);
            MerchItem.belongsTo(models.AlbumRelease);
        }
    }
  });
  return MerchItem;
};
