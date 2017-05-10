'use strict';

module.exports = function (sequelize, DataTypes) {
  var MerchItem = sequelize.define('MerchItem', {
    // TODO: Added properties for Merch
    'title': DataTypes.STRING,
    'shortDescription': DataTypes.STRING,
    'description': DataTypes.STRING,
    'sku': {
      'type': DataTypes.STRING,
      'unique': true
    },
    'stockQty': DataTypes.INTEGER,
    'format': DataTypes.STRING,
    'isDisplayed': DataTypes.BOOLEAN,
    'isFeatured': DataTypes.BOOLEAN
  }, {
    'classMethods': {
      associate: function associate(models) {
        MerchItem.hasMany(models.File);
        MerchItem.hasMany(models.PriceOption);
        MerchItem.belongsTo(models.Artist);
        MerchItem.belongsTo(models.AlbumRelease);
      }
    },
    'getterMethods': {
      isInStock: function isInStock() {
        return this.stockQty > 0;
      }
    }
  });
  return MerchItem;
};