'use strict';

import handlers from '../handlers';
import Joi from 'joi';

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
  },
  {
    'method': 'POST',
    'path': '/api/origins',
    'handler': handlers.origins.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new origin',
      'notes': 'Create a new origin',
      'validate': {
        'payload': {
          'ArtistId': Joi.number().required(),
          'city': Joi.optional(),
          'stateProvince': Joi.string().required(),
          'stateProvinceCode': Joi.optional(),
          'country': Joi.string().required(),
          'countryCode': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/origins/{id}',
    'handler': handlers.origins.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing origin',
      'notes': 'Update an Existing origin',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'id': Joi.optional(),
					'createdAt': Joi.optional(),
					'updatedAt': Joi.optional(),
					'ArtistId': Joi.optional(),
          'city': Joi.optional(),
          'stateProvince': Joi.string().required(),
          'stateProvinceCode': Joi.optional(),
          'country': Joi.string().required(),
          'countryCode': Joi.string().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/origins/{id}',
    'handler': handlers.origins.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an origin by id',
      'notes': 'Delete an origin by id',
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
