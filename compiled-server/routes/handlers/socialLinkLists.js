'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// SocialLinkList Route Configs
var socialLinkLists = {
  get: function get(request, reply) {
    _models2.default.SocialLinkList.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (socialLinkList) {
      if (socialLinkList) {
        reply(socialLinkList).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.SocialLinkList.findAll({
      'limit': 50
    }).then(function (socialLinkLists) {
      reply(socialLinkLists).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.SocialLinkList.findOrCreate({
      'where': {
        'ArtistId': request.payload.ArtistId
      },
      'defaults': {
        'ArtistId': request.payload.ArtistId,
        'facebookUrl': request.payload.facebookUrl,
        'twitterUrl': request.payload.twitterUrl,
        'instagramUrl': request.payload.instagramUrl,
        'soundcloudUrl': request.payload.soundcloudUrl,
        'bandcampUrl': request.payload.bandcampUrl,
        'homepageUrl': request.payload.homepageUrl,
        'tumblrUrl': request.payload.tumblrUrl,
        'spotifyUrl': request.payload.spotifyUrl,
        'youtubeUrl': request.payload.youtubeUrl,
        'displayFlag': request.payload.displayFlag
      }
    }).spread(function (socialLinkList, created) {
      if (!created) {
        reply(_boom2.default.badRequest('Social Links already exist for this artist'));
      } else {
        reply(socialLinkList).code(200);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.SocialLinkList.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (socialLinkList) {
      socialLinkList.updateAttributes({
        'facebookUrl': request.payload.facebookUrl,
        'twitterUrl': request.payload.twitterUrl,
        'instagramUrl': request.payload.instagramUrl,
        'soundcloudUrl': request.payload.soundcloudUrl,
        'bandcampUrl': request.payload.bandcampUrl,
        'homepageUrl': request.payload.homepageUrl,
        'tumblrUrl': request.payload.tumblrUrl,
        'spotifyUrl': request.payload.spotifyUrl,
        'youtubeUrl': request.payload.youtubeUrl,
        'displayFlag': request.payload.displayFlag
      }).then(function (socialLinkList) {
        if (socialLinkList) {
          reply(socialLinkList).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.SocialLinkList.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (socialLinkList) {
      if (socialLinkList) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = socialLinkLists;