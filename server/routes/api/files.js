'use strict';

let handlers = require('../handlers');
let Joi = require('joi');

module.exports = [
  // Files
  {
    'method': 'POST',
    'path': '/api/files',
    'handler': handlers.files.create,
    'config': {
      'tags': ['api'],
      'description': 'Add file details',
      'notes': 'Add file details',
      'validate': {
        'payload': {
          'ArtistId': Joi.optional(),
          'AlbumReleaseId': Joi.optional(),
          'SongId': Joi.optional(),
          'MerchItemId': Joi.optional(),
          'identifier': Joi.string().valid('featuredImage', 'photosCoverImage', 'albumCover', 'photo', 'artistTileFront', 'artistTileBack', 'download', 'song', 'productImage').required(),
          'imageUrl': Joi.optional(),
          'label': Joi.optional(),
          'name': Joi.string().required(),
          'size': Joi.number().required(),
          'type': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/files/{id}',
    'handler': handlers.files.update,
    'config': {
      'tags': ['api'],
      'description': 'Update file details',
      'notes': 'Update file details',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
          'ArtistId': Joi.optional(),
          'AlbumReleaseId': Joi.optional(),
          'SongId': Joi.optional(),
          'MerchId': Joi.optional(),
          'identifier': Joi.string().valid('featuredImage', 'photosCoverImage', 'albumCover', 'photo', 'artistTileFront', 'artistTileBack', 'download', 'song', 'productImage').required(),
          'imageUrl': Joi.optional(),
          'label': Joi.optional(),
          'name': Joi.string().required(),
          'size': Joi.number().required(),
          'type': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/files/add',
    'handler': handlers.files.add,
    'config': {
      'payload': {
        'output': 'stream',
        'maxBytes': 209715200,
        'parse': true,
        'allow': 'multipart/form-data'
      },
      'tags': ['api'],
      'description': 'Upload a new file',
      'notes': 'Upload a new file',
      'auth': {
        'strategy': 'jsonWebToken',
        'scope': ['contactAdmin', 'siteAdmin']
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'GET',
    'path': '/api/files',
    'handler': handlers.files.getAll,
    'config': {
      'tags': ['api'],
      'description': 'Get all files',
      'notes': 'Get all files',
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/files/{id}',
    'handler': handlers.files.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an file by id',
      'notes': 'Delete an file by id',
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
