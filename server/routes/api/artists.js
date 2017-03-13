'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
  // Artists
  {
    'method': 'GET',
    'path': '/api/artists/{param}',
    'handler': handlers.artists.get,
    'config': {
      'tags': ['api'],
      'description': 'Get one artists by param',
      'notes': 'Get one artists by param',
      'validate': {
        'params': {
          'param': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/artists/byId/{id}',
    'handler': handlers.artists.getById,
    'config': {
      'tags': ['api'],
      'description': 'Get one artists by ID',
      'notes': 'Get one artists by ID',
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
    'path': '/api/artists',
    'handler': handlers.artists.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all artists',
      'notes': 'Get all artists',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/artists/search',
    'handler': handlers.artists.search,
    'config': {
      'tags': ['api'],
      'description': 'Search artists and Paginate',
      'notes': 'Search artists and Paginate',
      'validate': {
        'payload': {
          'filter': Joi.optional(),
          'searchQuery': Joi.optional(),
          'pageNumber': Joi.number().required(),
          'pageSize': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/artists',
    'handler': handlers.artists.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new artist',
      'notes': 'Create a new artist',
      'validate': {
        'payload': {
          'Files': Joi.array().items(Joi.object().keys({
            'identifier': Joi.string().valid('artistTileFront', 'artistTileBack').required(),
            'name': Joi.string().required(),
            'size': Joi.number().required(),
            'type': Joi.string().required()
          })),
          'name': Joi.string().required(),
          'param': Joi.string().required(),
          'isCurrent': Joi.boolean().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/artists/{id}',
    'handler': handlers.artists.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing artist',
      'notes': 'Update an Existing artist',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'name': Joi.string().required(),
          'param': Joi.string().required(),
          'isCurrent': Joi.boolean().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/artists/{id}',
    'handler': handlers.artists.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an artist by id',
      'notes': 'Delete an artist by id',
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
