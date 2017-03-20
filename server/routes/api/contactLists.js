'use strict';

import * as handlers from '../handlers';
import Joi from 'joi';

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
  },
  {
    'method': 'POST',
    'path': '/api/contactLists',
    'handler': handlers.contactLists.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new contactList',
      'notes': 'Create a new contactList',
      'validate': {
        'payload': {
          'ArtistId': Joi.number(),
          'bandEmail': Joi.optional(),
          'bandPhone': Joi.optional(),
          'bandMailingAddress': Joi.optional(),
          'bookingManagerEmail': Joi.optional(),
          'bookingManagerPhone': Joi.optional(),
          'generalManagerEmail': Joi.string().required(),
          'generalManagerPhone': Joi.optional()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/contactLists/{id}',
    'handler': handlers.contactLists.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing contactList',
      'notes': 'Update an Existing contactList',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'id': Joi.optional(),
					'ArtistId': Joi.optional(),
					'createdAt': Joi.optional(),
					'updatedAt': Joi.optional(),
					'bandEmail': Joi.optional(),
          'bandPhone': Joi.optional(),
          'bandMailingAddress': Joi.optional(),
          'bookingManagerEmail': Joi.optional(),
          'bookingManagerPhone': Joi.optional(),
          'generalManagerEmail': Joi.string().required(),
          'generalManagerPhone': Joi.optional()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/contactLists/{id}',
    'handler': handlers.contactLists.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an contactList by id',
      'notes': 'Delete an contactList by id',
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
