'use strict';

let handlers = require('../handlers');
let Joi = require('joi');

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
          'id': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
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
  },
  {
    'method': 'POST',
    'path': '/api/digitalDownloads',
    'handler': handlers.digitalDownloads.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new digitalDownload',
      'notes': 'Create a new digitalDownload',
      'validate': {
        'payload': {
          'AlbumReleaseId': Joi.number(),
          'title': Joi.string(),
          'fileName': Joi.string(),
					'downloadCodes': Joi.array().items(Joi.string()).required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/digitalDownloads/{id}',
    'handler': handlers.digitalDownloads.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing digitalDownload',
      'notes': 'Update an Existing digitalDownload',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'title': Joi.string(),
          'fileName': Joi.string(),
					'downloadCodes': Joi.array().items(Joi.string()).required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/digitalDownloads/{id}',
    'handler': handlers.digitalDownloads.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an digitalDownload by id',
      'notes': 'Delete an digitalDownload by id',
      'validate': {
        'params': {
          'id': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
];
