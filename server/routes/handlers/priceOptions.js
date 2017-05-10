'use strict';

import models from '../../models';
import Boom from 'boom';

// PriceOption Route Configs
let priceOptions = {
  get: (request, reply) => {
    models.PriceOption.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((priceOption) => {
        if (priceOption) {
          reply(priceOption).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.PriceOption.findAll({
        'limit': 50
      })
      .then((priceOptions) => {
        reply(priceOptions).code(200);
      });
  },
  create: (request, reply) => {
    models.PriceOption.findOrCreate({
			'where': {
				'ArtistId': request.payload.ArtistId
			},
			'defaults': {
        'MerchItemId': request.payload.MerchItemId,
        'basePrice': request.payload.basePrice,
        'numItems': request.payload.numItems,
        'stockQty': request.payload.stockQty
      }
		}).spread((priceOption, created) => {
			if (!created) {
				reply(Boom.badRequest('Price option already exists for this artist.'))
			} else {
				reply(priceOption).code(200);
			}
    });
  },
  update: (request, reply) => {
    models.PriceOption.find({
      'where': {
        'id': request.params.id
      }
    }).then((priceOption) => {
      priceOption.updateAttributes({
        'basePrice': request.payload.basePrice,
        'numItems': request.payload.numItems,
        'stockQty': request.payload.stockQty
      }).then((priceOption) => {
				if (priceOption) {
					reply(priceOption).code(200);
				} else {
					reply().code(404);
				}
      });
    });
  },
  delete: (request, reply) => {
    models.PriceOption.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((priceOption) => {
        if (priceOption) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

export default priceOptions;
