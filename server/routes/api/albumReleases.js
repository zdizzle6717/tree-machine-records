'use strict';

let handlers = require('../handlers');
let Joi = require('joi');
let models = require('../../models');

module.exports = [
  // Album Releases
  {
    'method': 'GET',
    'path': '/api/albumReleases/{param}',
    'handler': handlers.albumReleases.get,
    'config': {
      'tags': ['api'],
      'description': 'Get one albumReleases by param',
      'notes': 'Get one albumReleases by param',
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
    'path': '/api/albumReleases',
    'handler': handlers.albumReleases.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all albumReleases',
      'notes': 'Get all albumReleases',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/albumReleases/featuredAlbums/list',
    'handler': handlers.albumReleases.getFeaturedAlbums,
    'config': {
      'tags': ['api'],
      'description': 'Get a list of featured AlbumReleases',
      'notes': 'Get a list of featured AlbumReleases',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/albumReleases/featuredAlbums/list',
    'handler': handlers.albumReleases.setFeaturedAlbums,
    'config': {
      'tags': ['api'],
      'description': 'Set the list of featured AlbumReleases',
      'notes': 'Set the list of featured AlbumReleases',
      'validate': {
        'payload': {
          'albumReleaseIds': Joi.array().items(Joi.number().required())
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/albumReleases/search',
    'handler': handlers.albumReleases.search,
    'config': {
      'tags': ['api'],
      'description': 'Search albumReleases and Paginate',
      'notes': 'Search albumReleases and Paginate',
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
    'path': '/api/albumReleases',
    'handler': handlers.albumReleases.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new albumRelease',
      'notes': 'Create a new albumRelease',
      'validate': {
        'payload': {
          'ArtistId': Joi.number().required(),
          'caption': Joi.optional(),
          'catalogueNumber': Joi.optional(),
          'Files': Joi.array().items(Joi.object().keys({
            'identifier': Joi.string().valid('albumCover').required(),
            'name': Joi.optional(),
            'size': Joi.number().required(),
            'type': Joi.optional()
          })),
          'iTunesUrl': Joi.optional(),
          'param': Joi.string().required(),
          'releaseDate': Joi.date().required(),
          'spotifyUrl': Joi.optional(),
          'summary': Joi.optional(),
          'title': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/albumReleases/{id}',
    'handler': handlers.albumReleases.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing albumRelease',
      'notes': 'Update an Existing albumRelease',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'caption': Joi.optional(),
          'catalogueNumber': Joi.optional(),
          'iTunesUrl': Joi.optional(),
          'param': Joi.string().required(),
          'releaseDate': Joi.date().required(),
          'spotifyUrl': Joi.optional(),
          'summary': Joi.optional(),
          'title': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/albumReleases/{id}',
    'handler': handlers.albumReleases.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an albumRelease by id',
      'notes': 'Delete an albumRelease by id',
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
