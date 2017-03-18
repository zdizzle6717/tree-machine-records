'use strict';

const models = require('../../models');
import Boom from 'boom';

// Origin Route Configs
let origins = {
  get: (request, reply) => {
    models.Origin.find({
        'where': {
          'id': request.params.id
        }
      })
      .then((origin) => {
        if (origin) {
          reply(origin).code(200);
        } else {
          reply().code(404);
        }
      });
  },
  getAll: (request, reply) => {
    models.Origin.findAll({
        'limit': 50
      })
      .then((origins) => {
        reply(origins).code(200);
      });
  },
  create: (request, reply) => {
    models.Origin.findOrCreate({
      'where': {
        'ArtistId': request.payload.ArtistId
      },
      'defaults': {
        'ArtistId': request.payload.ArtistId,
        'city': request.payload.city,
        'stateProvince': request.payload.stateProvince,
        'stateProvinceCode': request.payload.stateProvinceCode,
        'country': request.payload.country,
        'countryCode': request.payload.countryCode
      }
    }).spread((origin, created) => {
			if (!created) {
				reply(Boom.badRequest('Origin already exists for this artist'));
			} else {
				reply(origin).code(200);
			}
    });
  },
  update: (request, reply) => {
    models.Origin.find({
      'where': {
        'id': request.params.id
      }
    }).then((origin) => {
      origin.updateAttributes({
        'city': request.payload.city,
        'stateProvince': request.payload.stateProvince,
        'stateProvinceCode': request.payload.stateProvinceCode,
        'country': request.payload.country,
        'countryCode': request.payload.countryCode
      }).then((origin) => {
        if (origin) {
          reply(origin).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: (request, reply) => {
    models.Origin.destroy({
        'where': {
          'id': request.params.id
        }
      })
      .then((origin) => {
        if (origin) {
          reply().code(200);
        } else {
          reply().code(404);
        }
      });
  }
};

module.exports = origins;
