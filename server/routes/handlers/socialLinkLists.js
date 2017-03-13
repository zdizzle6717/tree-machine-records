'use strict';

const models = require('../../models');
const Boom = require('boom');


// SocialLinkList Route Configs
let socialLinkLists = {
  get: (request, reply) => {
    models.SocialLinkList.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((socialLinkList) => {
        if (socialLinkList) {
          reply(socialLinkList).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.SocialLinkList.findAll({
        'limit': 50
      })
      .then((socialLinkLists) => {
        reply(socialLinkLists).code(200);
      });
  },
  create: (request, reply) => {
    models.SocialLinkList.create({
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
      })
      .then((socialLinkList) => {
        reply(socialLinkList).code(200);
      });
  },
  update: (request, reply) => {
    models.SocialLinkList.find({
      'where': {
        'id': request.params.id
      }
    }).then((socialLinkList) => {
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
      }).then((socialLinkList) => {
				if (socialLinkList) {
					reply(socialLinkList).code(200);
				} else {
					reply().code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.SocialLinkList.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((socialLinkList) => {
        if (socialLinkList) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = socialLinkLists;
