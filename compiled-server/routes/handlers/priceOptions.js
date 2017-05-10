'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// PriceOption Route Configs
var priceOptions = {
  get: function get(request, reply) {
    _models2.default.PriceOption.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (priceOption) {
      if (priceOption) {
        reply(priceOption).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.PriceOption.findAll({
      'limit': 50
    }).then(function (priceOptions) {
      reply(priceOptions).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.PriceOption.findOrCreate({
      'where': {
        'ArtistId': request.payload.ArtistId
      },
      'defaults': {
        'MerchItemId': request.payload.MerchItemId,
        'basePrice': request.payload.basePrice,
        'numItems': request.payload.numItems,
        'stockQty': request.payload.stockQty
      }
    }).spread(function (priceOption, created) {
      if (!created) {
        reply(_boom2.default.badRequest('Price option already exists for this artist.'));
      } else {
        reply(priceOption).code(200);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.PriceOption.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (priceOption) {
      priceOption.updateAttributes({
        'basePrice': request.payload.basePrice,
        'numItems': request.payload.numItems,
        'stockQty': request.payload.stockQty
      }).then(function (priceOption) {
        if (priceOption) {
          reply(priceOption).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.PriceOption.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (priceOption) {
      if (priceOption) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = priceOptions;