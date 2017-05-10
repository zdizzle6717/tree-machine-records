'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Bio Sections
{
  'method': 'GET',
  'path': '/api/bioSections/{id}',
  'handler': handlers.bioSections.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one bioSections by id',
    'notes': 'Get one bioSections by id',
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
  'path': '/api/bioSections',
  'handler': handlers.bioSections.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all bioSections',
    'notes': 'Get all bioSections',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/bioSections',
  'handler': handlers.bioSections.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new bioSection',
    'notes': 'Create a new bioSection',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number().required(),
        'content': _joi2.default.array().items(_joi2.default.string()).required(),
        'sourceName': _joi2.default.optional(),
        'sourceUrl': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/bioSections/{id}',
  'handler': handlers.bioSections.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing bioSection',
    'notes': 'Update an Existing bioSection',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'content': _joi2.default.array().items(_joi2.default.string()).required(),
        'sourceName': _joi2.default.optional(),
        'sourceUrl': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/bioSections/{id}',
  'handler': handlers.bioSections.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an bioSection by id',
    'notes': 'Delete an bioSection by id',
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