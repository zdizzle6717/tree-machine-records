'use strict';

var _handlers = require('../handlers');

var handlers = _interopRequireWildcard(_handlers);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

module.exports = [
// Embeddable Medias
{
  'method': 'GET',
  'path': '/api/embeddableMedias/{id}',
  'handler': handlers.embeddableMedias.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one embeddableMedias by id',
    'notes': 'Get one embeddableMedias by id',
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
  'path': '/api/embeddableMedias',
  'handler': handlers.embeddableMedias.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all embeddableMedias',
    'notes': 'Get all embeddableMedias',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/embeddableMedias',
  'handler': handlers.embeddableMedias.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new embeddableMedia',
    'notes': 'Create a new embeddableMedia',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number().required(),
        'type': _joi2.default.string().valid('video', 'featuredTrack'),
        'title': _joi2.default.string().required(),
        'linkUrl': _joi2.default.string().required(),
        'embedUrl': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/embeddableMedias/{id}',
  'handler': handlers.embeddableMedias.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing embeddableMedia',
    'notes': 'Update an Existing embeddableMedia',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'ArtistId': _joi2.default.optional(),
        'type': _joi2.default.string().required(),
        'title': _joi2.default.string().required(),
        'linkUrl': _joi2.default.string().required(),
        'embedUrl': _joi2.default.string().required()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/embeddableMedias/{id}',
  'handler': handlers.embeddableMedias.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an embeddableMedia by id',
    'notes': 'Delete an embeddableMedia by id',
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