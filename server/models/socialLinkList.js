'use strict';
module.exports = function(sequelize, DataTypes) {
  var SocialLinkList = sequelize.define('SocialLinkList', {
    facebookUrl: DataTypes.STRING,
    twitterUrl: DataTypes.STRING,
    instagramUrl: DataTypes.STRING,
    soundcloudUrl: DataTypes.STRING,
    bandcampUrl: DataTypes.STRING,
    homepageUrl: DataTypes.STRING,
    tumblrUrl: DataTypes.STRING,
    spotifyUrl: DataTypes.STRING,
    youtubeUrl: DataTypes.STRING,
	displayFlag: DataTypes.INTEGER
  }, {
    classMethods: {
        associate: function(models) {
            SocialLinkList.belongsTo(models.Artist);
        }
    }
  });
  return SocialLinkList;
};
