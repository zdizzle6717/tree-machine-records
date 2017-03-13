'use strict';

const models = require('../../models');

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
  search: (request, reply) => {
    let totalResults = 0;
    let totalPages = 0;
    let offset = 0;
    models.Artist.findAndCountAll()
      .then((allResults) => {
        totalResults = allResults.count;
        let totalPagesDecimal = totalResults === 0 ? 0 : (totalResults / request.payload.pageSize);
        totalPages = Math.ceil(totalPagesDecimal);
        offset = (request.payload.pageNumber - 1) * request.payload.pageSize;
        models.Artist.findAll({
          'offset': offset,
          'limit': request.payload.pageSize,
          'include': [{
            'model': models.File
          }]
        }).then((results) => {
          reply({
            'pagination': {
              'pageNumber': request.payload.pageNumber,
              'pageSize': request.payload.pageSize,
              'totalPages': totalPages,
              'totalResults': totalResults
            },
            'results': results
          }).code(200);
        });
      });
  },
  create: (request, reply) => {
    models.MerchItem.create({
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
      })
      .then((merchItem) => {
        reply(merchItem).code(200);
      });
  },
  update: (request, reply) => {
    models.File.find({
      'where': {
        'id': request.params.id
      }
    }).then((merchItem) => {
      merchItem.updateAttributes({
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

module.exports = merchItems;
