'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
  // Songs
  {
    'method': 'GET',
    'path': '/api/songs/{id}',
    'handler': handlers.songs.get,
    'config': {
      'tags': ['api'],
      'description': 'Get one songs by id',
      'notes': 'Get one songs by id',
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
    'path': '/api/songs',
    'handler': handlers.songs.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all songs',
      'notes': 'Get all songs',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/songs/featuredSongs/list',
    'handler': handlers.songs.getFeaturedSongs,
    'config': {
      'tags': ['api'],
      'description': 'Get a list of featured Songs',
      'notes': 'Get a list of featured Songs',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/songs/featuredSongs/list',
    'handler': handlers.songs.setFeaturedSongs,
    'config': {
      'tags': ['api'],
      'description': 'Set the list of featured Songs',
      'notes': 'Set the list of featured Songs',
      'validate': {
        'payload': {
          'songIds': Joi.array().items(Joi.number().required())
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/songs',
    'handler': handlers.songs.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new song',
      'notes': 'Create a new song',
      'validate': {
        'payload': {
          'AlbumReleaseId': Joi.number().required(),
          'title': Joi.string().required(),
          'fileName': Joi.string().required(),
          'File': Joi.object().keys({
            'identifier': Joi.string().valid('song').required(),
            'name': Joi.string().required(),
            'size': Joi.number().required(),
            'type': Joi.optional()
          })
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/songs/{id}',
    'handler': handlers.songs.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing song',
      'notes': 'Update an Existing song',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'title': Joi.string().required(),
          'fileName': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/songs/{id}',
    'handler': handlers.songs.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an song by id',
      'notes': 'Delete an song by id',
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
