'use strict';

import * as handlers from '../handlers';
import Joi from 'joi';

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
  },
  {
    'method': 'POST',
    'path': '/api/bioSections',
    'handler': handlers.bioSections.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new bioSection',
      'notes': 'Create a new bioSection',
      'validate': {
        'payload': {
          'ArtistId': Joi.number().required(),
          'content': Joi.array().items(Joi.string()).required(),
          'sourceName': Joi.optional(),
          'sourceUrl': Joi.optional()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/bioSections/{id}',
    'handler': handlers.bioSections.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing bioSection',
      'notes': 'Update an Existing bioSection',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'id': Joi.optional(),
					'ArtistId': Joi.optional(),
          'content': Joi.array().items(Joi.string()).required(),
          'sourceName': Joi.optional(),
          'sourceUrl': Joi.optional(),
					'createdAt': Joi.optional(),
					'updatedAt': Joi.optional()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/bioSections/{id}',
    'handler': handlers.bioSections.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an bioSection by id',
      'notes': 'Delete an bioSection by id',
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
