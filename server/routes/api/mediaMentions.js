'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
  // Media Mentions
  {
    'method': 'GET',
    'path': '/api/mediaMentions/{id}',
    'handler': handlers.mediaMentions.get,
    'config': {
      'tags': ['api'],
      'description': 'Get one mediaMentions by id',
      'notes': 'Get one mediaMentions by id',
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
    'path': '/api/mediaMentions',
    'handler': handlers.mediaMentions.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all mediaMentions',
      'notes': 'Get all mediaMentions',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/mediaMentions',
    'handler': handlers.mediaMentions.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new mediaMention',
      'notes': 'Create a new mediaMention',
      'validate': {
        'payload': {
          'ArtistId': Joi.number(),
          'AlbumReleaseId': Joi.optional(),
          'author': Joi.string().required(),
          'date': Joi.date().required(),
          'linkUrl': Joi.string().required(),
          'title': Joi.string(),
          'text': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/mediaMentions/{id}',
    'handler': handlers.mediaMentions.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing mediaMention',
      'notes': 'Update an Existing mediaMention',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'id': Joi.optional(),
					'ArtistId': Joi.optional(),
					'updatedAt': Joi.optional(),
					'createdAt': Joi.optional(),
          'AlbumReleaseId': Joi.optional(),
          'author': Joi.string(),
          'date': Joi.date(),
          'linkUrl': Joi.string(),
          'title': Joi.string(),
          'text': Joi.string()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/mediaMentions/{id}',
    'handler': handlers.mediaMentions.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an mediaMention by id',
      'notes': 'Delete an mediaMention by id',
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
];
