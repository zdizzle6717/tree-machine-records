'use strict';

module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    dob: DataTypes.DATEONLY,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    bio: DataTypes.TEXT,
    homepageLink: DataTypes.STRING,
    facebookLink: DataTypes.STRING,
    twitterLink: DataTypes.STRING,
    instagramLink: DataTypes.STRING,
    soundcloudLink: DataTypes.STRING,
    siteAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    artist: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    subscriber: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.File);
        User.hasMany(models.UserMessage);
        User.hasMany(models.UserNotification);
        User.hasMany(models.User, {
          as: 'Friends',
          joinTableName: 'userHasFriends'
        });
        User.belongsToMany(models.User, {
          as: 'Friends',
          through: 'userHasFriends'
        });
      }
    }
  });
  return User;
};
