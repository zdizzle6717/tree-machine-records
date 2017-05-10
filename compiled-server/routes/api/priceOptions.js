'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Price Options
{
  'method': 'GET',
  'path': '/api/priceOptions/{id}',
  'handler': handlers.priceOptions.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one price option by id',
    'notes': 'Get one price option by id',
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
  'path': '/api/priceOptions',
  'handler': handlers.priceOptions.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all price options',
    'notes': 'Get all price options',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/priceOptions',
  'handler': handlers.priceOptions.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new price option',
    'notes': 'Create a new price option',
    'validate': {
      'payload': {
        'MerchItemId': _joi2.default.number().required(),
        'basePrice': _joi2.default.number().required(),
        'numItems': _joi2.default.number().required(),
        'stockQty': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/priceOptions/{id}',
  'handler': handlers.priceOptions.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing price option',
    'notes': 'Update an Existing price option',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'MerchItemId': _joi2.default.number().required(),
        'basePrice': _joi2.default.number().required(),
        'numItems': _joi2.default.number().required(),
        'stockQty': _joi2.default.number().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/priceOptions/{id}',
  'handler': handlers.priceOptions.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an price option by id',
    'notes': 'Delete an price option by id',
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