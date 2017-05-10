'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Social Link Lists
{
  'method': 'GET',
  'path': '/api/socialLinkLists/{id}',
  'handler': handlers.socialLinkLists.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one socialLinkLists by id',
    'notes': 'Get one socialLinkLists by id',
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
  'path': '/api/socialLinkLists',
  'handler': handlers.socialLinkLists.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all socialLinkLists',
    'notes': 'Get all socialLinkLists',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/socialLinkLists',
  'handler': handlers.socialLinkLists.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new socialLinkList',
    'notes': 'Create a new socialLinkList',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number().required(),
        'facebookUrl': _joi2.default.optional(),
        'twitterUrl': _joi2.default.optional(),
        'instagramUrl': _joi2.default.optional(),
        'soundcloudUrl': _joi2.default.optional(),
        'bandcampUrl': _joi2.default.optional(),
        'homepageUrl': _joi2.default.optional(),
        'tumblrUrl': _joi2.default.optional(),
        'spotifyUrl': _joi2.default.optional(),
        'youtubeUrl': _joi2.default.optional(),
        'displayFlag': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/socialLinkLists/{id}',
  'handler': handlers.socialLinkLists.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing socialLinkList',
    'notes': 'Update an Existing socialLinkList',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'facebookUrl': _joi2.default.optional(),
        'twitterUrl': _joi2.default.optional(),
        'instagramUrl': _joi2.default.optional(),
        'soundcloudUrl': _joi2.default.optional(),
        'bandcampUrl': _joi2.default.optional(),
        'homepageUrl': _joi2.default.optional(),
        'tumblrUrl': _joi2.default.optional(),
        'spotifyUrl': _joi2.default.optional(),
        'youtubeUrl': _joi2.default.optional(),
        'displayFlag': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/socialLinkLists/{id}',
  'handler': handlers.socialLinkLists.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an socialLinkList by id',
    'notes': 'Delete an socialLinkList by id',
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