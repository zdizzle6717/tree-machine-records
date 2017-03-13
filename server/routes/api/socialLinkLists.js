'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
  // Social Link Lists
  {
    'method': 'GET',
    'path': '/api/socialLinkLists/{id}',
    'handler': handlers.socialLinkLists.get,
    'config': {
      'tags': ['api'],
      'description': 'Get one socialLinkLists by id',
      'notes': 'Get one socialLinkLists by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/socialLinkLists',
    'handler': handlers.socialLinkLists.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all socialLinkLists',
      'notes': 'Get all socialLinkLists',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/socialLinkLists',
    'handler': handlers.socialLinkLists.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new socialLinkList',
      'notes': 'Create a new socialLinkList',
      'validate': {
        'payload': {
          'ArtistId': Joi.number().required(),
          'facebookUrl': Joi.optional(),
          'twitterUrl': Joi.optional(),
          'instagramUrl': Joi.optional(),
          'soundcloudUrl': Joi.optional(),
          'bandcampUrl': Joi.optional(),
          'homepageUrl': Joi.optional(),
          'tumblrUrl': Joi.optional(),
          'spotifyUrl': Joi.optional(),
          'youtubeUrl': Joi.optional(),
          'displayFlag': Joi.optional()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/socialLinkLists/{id}',
    'handler': handlers.socialLinkLists.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing socialLinkList',
      'notes': 'Update an Existing socialLinkList',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'facebookUrl': Joi.optional(),
          'twitterUrl': Joi.optional(),
          'instagramUrl': Joi.optional(),
          'soundcloudUrl': Joi.optional(),
          'bandcampUrl': Joi.optional(),
          'homepageUrl': Joi.optional(),
          'tumblrUrl': Joi.optional(),
          'spotifyUrl': Joi.optional(),
          'youtubeUrl': Joi.optional(),
          'displayFlag': Joi.optional()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/socialLinkLists/{id}',
    'handler': handlers.socialLinkLists.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an socialLinkList by id',
      'notes': 'Delete an socialLinkList by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  }
];
