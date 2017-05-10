'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Merch Items
{
  'method': 'GET',
  'path': '/api/merchItems/{id}',
  'handler': handlers.merchItems.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one merchItems by id',
    'notes': 'Get one merchItems by id',
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
  'path': '/api/merchItems',
  'handler': handlers.merchItems.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all merchItems',
    'notes': 'Get all merchItems',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/merchItems/search',
  'handler': handlers.merchItems.search,
  'config': {
    'tags': ['api'],
    'description': 'Search merchItems and Paginate',
    'notes': 'Search merchItems and Paginate',
    'validate': {
      'payload': {
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
  'path': '/api/merchItems',
  'handler': handlers.merchItems.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new merchItem',
    'notes': 'Create a new merchItem',
    'validate': {
      'payload': {
        'AlbumReleaseId': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'title': _joi2.default.string().required(),
        'shortDescription': _joi2.default.string().required(),
        'description': _joi2.default.string().required(),
        'Files': _joi2.default.optional(),
        'sku': _joi2.default.string().required(),
        'stockQty': _joi2.default.number().required(),
        'format': _joi2.default.string().valid('vinyl', 'cds', 'cassettes', 'apparel', 'posters', 'stickers', 'lighters', 'other').required(),
        'isDisplayed': _joi2.default.boolean().required(),
        'isFeatured': _joi2.default.boolean().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/merchItems/{id}',
  'handler': handlers.merchItems.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing merchItem',
    'notes': 'Update an Existing merchItem',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'AlbumReleaseId': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'AlbumRelease': _joi2.default.optional(),
        'PriceOptions': _joi2.default.optional(),
        'title': _joi2.default.string().required(),
        'shortDescription': _joi2.default.string().required(),
        'description': _joi2.default.string().required(),
        'Files': _joi2.default.optional(),
        'sku': _joi2.default.string().required(),
        'stockQty': _joi2.default.number().required(),
        'format': _joi2.default.string().valid('vinyl', 'cds', 'cassettes', 'apparel', 'posters', 'stickers', 'lighters', 'other').required(),
        'isDisplayed': _joi2.default.boolean().required(),
        'isFeatured': _joi2.default.boolean().required(),
        'id': _joi2.default.optional(),
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
  'path': '/api/merchItems/{id}',
  'handler': handlers.merchItems.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an merchItem by id',
    'notes': 'Delete an merchItem by id',
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