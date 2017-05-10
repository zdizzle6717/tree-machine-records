'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        'ArtistId': _joi2.default.optional(),
        'AlbumReleaseId': _joi2.default.optional(),
        'SongId': _joi2.default.optional(),
        'MerchItemId': _joi2.default.optional(),
        'identifier': _joi2.default.string().valid('featuredImage', 'photosCoverImage', 'albumCover', 'photo', 'artistTileFront', 'artistTileBack', 'download', 'song', 'productImage').required(),
        'locationUrl': _joi2.default.optional(),
        'label': _joi2.default.optional(),
        'name': _joi2.default.string().required(),
        'size': _joi2.default.number().required(),
        'type': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/files/{id}',
  'handler': handlers.files.update,
  'config': {
    'tags': ['api'],
    'description': 'Update file details',
    'notes': 'Update file details',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'ArtistId': _joi2.default.optional(),
        'AlbumReleaseId': _joi2.default.optional(),
        'SongId': _joi2.default.optional(),
        'MerchId': _joi2.default.optional(),
        'identifier': _joi2.default.string().valid('featuredImage', 'photosCoverImage', 'albumCover', 'photo', 'artistTileFront', 'artistTileBack', 'download', 'song', 'productImage').required(),
        'locationUrl': _joi2.default.optional(),
        'label': _joi2.default.optional(),
        'name': _joi2.default.string().required(),
        'size': _joi2.default.number().required(),
        'type': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
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
}, {
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
}, {
  'method': 'DELETE',
  'path': '/api/files/{id}',
  'handler': handlers.files.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an file by id',
    'notes': 'Delete an file by id',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}];