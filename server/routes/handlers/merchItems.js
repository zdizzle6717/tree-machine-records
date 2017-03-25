'use strict';

import models from '../../models';
import Boom from 'boom';

// MerchItem Route Configs
let merchItems = {
  get: (request, reply) => {
    models.MerchItem.find({
        'where': {
          'id': request.params.id
        },
        'include': [{
            'model': models.AlbumRelease
          },
          {
            'model': models.File
          }
        ]
      })
      .then((merchItem) => {
        if (merchItem) {
          reply(merchItem).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.MerchItem.findAll({
        'limit': 50,
        'include': [{
            'model': models.AlbumRelease,
            'include': [{
              'model': models.Artist,
              'attributes': ['name']
            }]
          },
          {
            'model': models.File
          }
        ]
      })
      .then((merchItems) => {
        reply(merchItems).code(200);
      });
  },
	'search': (request, reply) => {
    let searchByConfig;
    let pageSize = request.payload.pageSize || 20;
    let searchQuery = request.payload.searchQuery || '';
    let offset = (request.payload.pageNumber - 1) * pageSize;
    if (searchQuery) {
      searchByConfig = request.payload.searchBy ? {
        [request.payload.searchBy]: {
          '$like': '%' + searchQuery + '%'
        }
      } : {
        '$or': [{
            'username': {
              '$like': '%' + searchQuery + '%'
            }
          },
          {
            'email': {
              '$like': '%' + searchQuery + '%'
            }
          },
          {
            'lastName': {
              '$like': '%' + searchQuery + '%'
            }
          }
        ]
      };
    } else {
      searchByConfig = {};
    }
    models.MerchItem.findAndCountAll({
      'where': searchByConfig,
      'offset': offset,
      'limit': pageSize,
			'include': [
				{
					'model': models.File
				},
				{
					'model': models.Artist
				},
				{
					'model': models.AlbumRelease
				}
			]
    }).then((response) => {
      let count = response.count;
      let results = response.rows;
      let totalPages = Math.ceil(count === 0 ? 1 : (count / pageSize));

      reply({
        'pagination': {
          'pageNumber': request.payload.pageNumber,
          'pageSize': pageSize,
          'totalPages': totalPages,
          'totalResults': count
        },
        'results': results
      }).code(200);
    });
  },
  create: (request, reply) => {
    models.MerchItem.findOrCreate({
      'where': {
        'sku': request.payload.sku
      },
      'defaults': {
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'price': request.payload.price,
        'shortDescription': request.payload.shortDescription,
        'description': request.payload.description,
        'sku': request.payload.sku,
        'qty': request.payload.qty,
        'format': request.payload.format,
        'isDisplayed': request.payload.isDisplayed,
        'isFeatured': request.payload.isFeatured
      }
    }).spread((merchItem, created) => {
      if (!created) {
				reply(Boom.badRequest('SKU must be a unique value'));
      } else {
        reply(merchItem).code(200);
      }
    });
  },
  update: (request, reply) => {
    models.MerchItem.find({
      'where': {
        'id': request.params.id
      }
    }).then((merchItem) => {
      merchItem.updateAttributes({
				'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'price': request.payload.price,
        'shortDescription': request.payload.shortDescription,
        'description': request.payload.description,
        'sku': request.payload.sku,
        'qty': request.payload.qty,
        'format': request.payload.format,
        'isDisplayed': request.payload.isDisplayed,
        'isFeatured': request.payload.isFeatured
      }).then((merchItem) => {
        if (merchItem) {
          reply(merchItem).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: (request, reply) => {
    models.MerchItem.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((merchItem) => {
        if (merchItem) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

export default merchItems;
