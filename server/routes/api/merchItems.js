'use strict';

let handlers = require('../handlers');
let Joi = require('joi');

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
  },
  {
    'method': 'POST',
    'path': '/api/merchItems/search',
    'handler': handlers.merchItems.search,
    'config': {
      'tags': ['api'],
      'description': 'Search merchItems and Paginate',
      'notes': 'Search merchItems and Paginate',
      'validate': {
        'payload': {
          'searchQuery': Joi.optional(),
          'pageNumber': Joi.number().required(),
          'pageSize': Joi.number().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'POST',
    'path': '/api/merchItems',
    'handler': handlers.merchItems.create,
    'config': {
      'tags': ['api'],
      'description': 'Create a new merchItem',
      'notes': 'Create a new merchItem',
      'validate': {
        'payload': {
					'AlbumReleaseId': Joi.optional(),
          'title': Joi.string().required(),
          'price': Joi.string().required(),
          'shortDescription': Joi.string().required(),
          'description': Joi.string().required(),
					'Files': Joi.optional(),
          'sku': Joi.string().required(),
          'qty': Joi.number().required(),
          'format': Joi.string().valid('vinyl', 'cds', 'cassettes', 'apparel', 'posters', 'stickers', 'lighters', 'other').required(),
          'isDisplayed': Joi.boolean().required(),
          'isFeatured': Joi.boolean().required()
        }
      },
      'cors': {
        'origin': ['*']
      }
    }
  },
  {
    'method': 'PUT',
    'path': '/api/merchItems/{id}',
    'handler': handlers.merchItems.update,
    'config': {
      'tags': ['api'],
      'description': 'Update an Existing merchItem',
      'notes': 'Update an Existing merchItem',
      'validate': {
        'params': {
          'id': Joi.number().required()
        },
        'payload': {
					'AlbumReleaseId': Joi.optional(),
					'ArtistId': Joi.optional(),
					'AlbumRelease': Joi.optional(),
          'title': Joi.string().required(),
          'price': Joi.string().required(),
          'shortDescription': Joi.string().required(),
          'description': Joi.string().required(),
          'sku': Joi.string().required(),
          'qty': Joi.number().required(),
          'format': Joi.string().valid('vinyl', 'cds', 'cassettes', 'apparel', 'posters', 'stickers', 'lighters', 'other').required(),
          'isDisplayed': Joi.boolean().required(),
          'isFeatured': Joi.boolean().required(),
					'id': Joi.optional(),
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
    'path': '/api/merchItems/{id}',
    'handler': handlers.merchItems.delete,
    'config': {
      'tags': ['api'],
      'description': 'Delete an merchItem by id',
      'notes': 'Delete an merchItem by id',
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
