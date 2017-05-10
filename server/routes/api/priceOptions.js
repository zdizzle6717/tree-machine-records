'use strict';

import * as handlers from '../handlers';
import Joi from 'joi';

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
  },
  {
    'method': 'POST',
    'path': '/api/priceOptions',
    'handler': handlers.priceOptions.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new price option',
      'notes': 'Create a new price option',
      'validate': {
        'payload': {
          'MerchItemId': Joi.number().required(),
          'basePrice': Joi.number().required(),
          'numItems': Joi.number().required(),
          'stockQty': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/priceOptions/{id}',
    'handler': handlers.priceOptions.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing price option',
      'notes': 'Update an Existing price option',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'id': Joi.optional(),
					'MerchItemId': Joi.number().required(),
          'basePrice': Joi.number().required(),
          'numItems': Joi.number().required(),
          'stockQty': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'DELETE',
    'path': '/api/priceOptions/{id}',
    'handler': handlers.priceOptions.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an price option by id',
      'notes': 'Delete an price option by id',
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
