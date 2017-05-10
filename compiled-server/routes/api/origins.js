'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Origins
{
  'method': 'GET',
  'path': '/api/origins/{id}',
  'handler': handlers.origins.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one origins by id',
    'notes': 'Get one origins by id',
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
  'path': '/api/origins',
  'handler': handlers.origins.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all origins',
    'notes': 'Get all origins',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/origins',
  'handler': handlers.origins.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new origin',
    'notes': 'Create a new origin',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number().required(),
        'city': _joi2.default.optional(),
        'stateProvince': _joi2.default.string().required(),
        'stateProvinceCode': _joi2.default.optional(),
        'country': _joi2.default.string().required(),
        'countryCode': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/origins/{id}',
  'handler': handlers.origins.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing origin',
    'notes': 'Update an Existing origin',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'city': _joi2.default.optional(),
        'stateProvince': _joi2.default.string().required(),
        'stateProvinceCode': _joi2.default.optional(),
        'country': _joi2.default.string().required(),
        'countryCode': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/origins/{id}',
  'handler': handlers.origins.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an origin by id',
    'notes': 'Delete an origin by id',
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