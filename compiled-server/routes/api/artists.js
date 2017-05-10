'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        'param': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'GET',
  'path': '/api/artists/byId/{id}',
  'handler': handlers.artists.getById,
  'config': {
    'tags': ['api'],
    'description': 'Get one artists by ID',
    'notes': 'Get one artists by ID',
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
}, {
  'method': 'POST',
  'path': '/api/artists/search',
  'handler': handlers.artists.search,
  'config': {
    'tags': ['api'],
    'description': 'Search artists and Paginate',
    'notes': 'Search artists and Paginate',
    'validate': {
      'payload': {
        'filter': _joi2.default.optional(),
        'searchQuery': _joi2.default.optional(),
        'pageNumber': _joi2.default.number().required(),
        'pageSize': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/artists',
  'handler': handlers.artists.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new artist',
    'notes': 'Create a new artist',
    'validate': {
      'payload': {
        'Files': _joi2.default.array().items(_joi2.default.object().keys({
          'identifier': _joi2.default.string().valid('artistTileFront', 'artistTileBack').required(),
          'name': _joi2.default.string().required(),
          'size': _joi2.default.number().required(),
          'type': _joi2.default.string().required()
        })),
        'name': _joi2.default.string().required(),
        'param': _joi2.default.string().required(),
        'isCurrent': _joi2.default.boolean().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/artists/{id}',
  'handler': handlers.artists.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing artist',
    'notes': 'Update an Existing artist',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'name': _joi2.default.string().required(),
        'param': _joi2.default.string().required(),
        'isCurrent': _joi2.default.boolean().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/artists/{id}',
  'handler': handlers.artists.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an artist by id',
    'notes': 'Delete an artist by id',
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