'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        'id': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
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
}, {
  'method': 'POST',
  'path': '/api/mediaMentions',
  'handler': handlers.mediaMentions.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new mediaMention',
    'notes': 'Create a new mediaMention',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number(),
        'AlbumReleaseId': _joi2.default.optional(),
        'author': _joi2.default.string().required(),
        'date': _joi2.default.date().required(),
        'linkUrl': _joi2.default.string().required(),
        'title': _joi2.default.string(),
        'text': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/mediaMentions/{id}',
  'handler': handlers.mediaMentions.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing mediaMention',
    'notes': 'Update an Existing mediaMention',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'AlbumReleaseId': _joi2.default.optional(),
        'author': _joi2.default.string(),
        'date': _joi2.default.date(),
        'linkUrl': _joi2.default.string(),
        'title': _joi2.default.string(),
        'text': _joi2.default.string()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/mediaMentions/{id}',
  'handler': handlers.mediaMentions.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an mediaMention by id',
    'notes': 'Delete an mediaMention by id',
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