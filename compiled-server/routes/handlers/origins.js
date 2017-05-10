'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Origin Route Configs
var origins = {
  get: function get(request, reply) {
    _models2.default.Origin.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (origin) {
      if (origin) {
        reply(origin).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.Origin.findAll({
      'limit': 50
    }).then(function (origins) {
      reply(origins).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.Origin.findOrCreate({
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
    }).spread(function (origin, created) {
      if (!created) {
        reply(_boom2.default.badRequest('Origin already exists for this artist'));
      } else {
        reply(origin).code(200);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.Origin.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (origin) {
      origin.updateAttributes({
        'city': request.payload.city,
        'stateProvince': request.payload.stateProvince,
        'stateProvinceCode': request.payload.stateProvinceCode,
        'country': request.payload.country,
        'countryCode': request.payload.countryCode
      }).then(function (origin) {
        if (origin) {
          reply(origin).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.Origin.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (origin) {
      if (origin) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = origins;