'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Contact Lists
{
  'method': 'GET',
  'path': '/api/contactLists/{id}',
  'handler': handlers.contactLists.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one contactLists by id',
    'notes': 'Get one contactLists by id',
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
  'path': '/api/contactLists',
  'handler': handlers.contactLists.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all contactLists',
    'notes': 'Get all contactLists',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/contactLists',
  'handler': handlers.contactLists.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new contactList',
    'notes': 'Create a new contactList',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number(),
        'bandEmail': _joi2.default.optional(),
        'bandPhone': _joi2.default.optional(),
        'bandMailingAddress': _joi2.default.optional(),
        'bookingManagerEmail': _joi2.default.optional(),
        'bookingManagerPhone': _joi2.default.optional(),
        'generalManagerEmail': _joi2.default.string().required(),
        'generalManagerPhone': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/contactLists/{id}',
  'handler': handlers.contactLists.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing contactList',
    'notes': 'Update an Existing contactList',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'bandEmail': _joi2.default.optional(),
        'bandPhone': _joi2.default.optional(),
        'bandMailingAddress': _joi2.default.optional(),
        'bookingManagerEmail': _joi2.default.optional(),
        'bookingManagerPhone': _joi2.default.optional(),
        'generalManagerEmail': _joi2.default.string().required(),
        'generalManagerPhone': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/contactLists/{id}',
  'handler': handlers.contactLists.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an contactList by id',
    'notes': 'Delete an contactList by id',
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