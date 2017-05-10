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
  'path': '/api/digitalDownloads/{id}',
  'handler': handlers.digitalDownloads.get,
  'config': {
    'tags': ['api'],
    'description': 'Get one digitalDownload by id',
    'notes': 'Get one digitalDownload by id',
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
  'path': '/api/digitalDownloads',
  'handler': handlers.digitalDownloads.getAll,
  'config': {
    'tags': ['api'],
    'description': 'Get all digitalDownloads',
    'notes': 'Get all digitalDownloads',
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'POST',
  'path': '/api/digitalDownloads',
  'handler': handlers.digitalDownloads.create,
  'config': {
    'tags': ['api'],
    'description': 'Create a new digitalDownload',
    'notes': 'Create a new digitalDownload',
    'validate': {
      'payload': {
        'ArtistId': _joi2.default.number().required(),
        'AlbumReleaseId': _joi2.default.number().required(),
        'title': _joi2.default.string(),
        'fileName': _joi2.default.string(),
        'downloadCodes': _joi2.default.array().items(_joi2.default.string()).required(),
        'File': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'PUT',
  'path': '/api/digitalDownloads/{id}',
  'handler': handlers.digitalDownloads.update,
  'config': {
    'tags': ['api'],
    'description': 'Update an Existing digitalDownload',
    'notes': 'Update an Existing digitalDownload',
    'validate': {
      'params': {
        'id': _joi2.default.number().required()
      },
      'payload': {
        'id': _joi2.default.optional(),
        'createdAt': _joi2.default.optional(),
        'updatedAt': _joi2.default.optional(),
        'ArtistId': _joi2.default.number().required(),
        'AlbumReleaseId': _joi2.default.number().required(),
        'title': _joi2.default.string(),
        'fileName': _joi2.default.string(),
        'downloadCodes': _joi2.default.array().items(_joi2.default.string()).required(),
        'File': _joi2.default.optional()
      }
    },
    'cors': {
      'origin': ['*']
    }
  }
}, {
  'method': 'DELETE',
  'path': '/api/digitalDownloads/{id}',
  'handler': handlers.digitalDownloads.delete,
  'config': {
    'tags': ['api'],
    'description': 'Delete an digitalDownload by id',
    'notes': 'Delete an digitalDownload by id',
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