'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        'id': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
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
}, {
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
}, {
  'method': 'POST',
  'path': '/api/songs/featuredSongs/list',
  'handler': handlers.songs.setFeaturedSongs,
  'config': {
    'tags': ['api'],
    'description': 'Set the list of featured Songs',
    'notes': 'Set the list of featured Songs',
    'validate': {
      'payload': {
        'songIds': _joi2.default.array().items(_joi2.default.number().required())
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/songs',
  'handler': handlers.songs.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new song',
    'notes': 'Create a new song',
    'validate': {
      'payload': {
        'AlbumReleaseId': _joi2.default.number().required(),
        'ArtistId': _joi2.default.number().required(),
        'title': _joi2.default.string().required(),
        'fileName': _joi2.default.string().required(),
        'File': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/songs/{id}',
  'handler': handlers.songs.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing song',
    'notes': 'Update an Existing song',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'AlbumReleaseId': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'title': _joi2.default.string().required(),
        'fileName': _joi2.default.string().required(),
        'File': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/songs/{id}',
  'handler': handlers.songs.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an song by id',
    'notes': 'Delete an song by id',
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