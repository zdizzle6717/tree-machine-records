'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// MerchItem Route Configs
var merchItems = {
  get: function get(request, reply) {
    _models2.default.MerchItem.find({
      'where': {
        'id': request.params.id
      },
      'include': [{
        'model': _models2.default.AlbumRelease
      }, {
        'model': _models2.default.File
      }, {
        'model': _models2.default.PriceOption
      }]
    }).then(function (merchItem) {
      if (merchItem) {
        reply(merchItem).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.MerchItem.findAll({
      'limit': 50,
      'include': [{
        'model': _models2.default.AlbumRelease,
        'include': [{
          'model': _models2.default.Artist,
          'attributes': ['name']
        }, {
          'model': _models2.default.PriceOption
        }]
      }, {
        'model': _models2.default.File
      }]
    }).then(function (merchItems) {
      reply(merchItems).code(200);
    });
  },
  'search': function search(request, reply) {
    var searchByConfig = void 0;
    var pageSize = request.payload.pageSize || 20;
    var searchQuery = request.payload.searchQuery || '';
    var offset = (request.payload.pageNumber - 1) * pageSize;
    if (searchQuery) {
      searchByConfig = request.payload.searchBy ? _defineProperty({}, request.payload.searchBy, {
        '$like': '%' + searchQuery + '%'
      }) : {
        '$or': [{
          'username': {
            '$like': '%' + searchQuery + '%'
          }
        }, {
          'email': {
            '$like': '%' + searchQuery + '%'
          }
        }, {
          'lastName': {
            '$like': '%' + searchQuery + '%'
          }
        }]
      };
    } else {
      searchByConfig = {};
    }
    _models2.default.MerchItem.findAndCountAll({
      'where': searchByConfig,
      'offset': offset,
      'limit': pageSize,
      'include': [{
        'model': _models2.default.File
      }, {
        'model': _models2.default.Artist
      }, {
        'model': _models2.default.AlbumRelease
      }, {
        'model': _models2.default.PriceOption
      }]
    }).then(function (response) {
      var count = response.count;
      var results = response.rows;
      var totalPages = Math.ceil(count === 0 ? 1 : count / pageSize);

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
  create: function create(request, reply) {
    _models2.default.MerchItem.findOrCreate({
      'where': {
        'sku': request.payload.sku
      },
      'defaults': {
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'shortDescription': request.payload.shortDescription,
        'description': request.payload.description,
        'sku': request.payload.sku,
        'stockQty': request.payload.stockQty,
        'format': request.payload.format,
        'isDisplayed': request.payload.isDisplayed,
        'isFeatured': request.payload.isFeatured
      }
    }).spread(function (merchItem, created) {
      if (!created) {
        reply(_boom2.default.badRequest('SKU must be a unique value'));
      } else {
        reply(merchItem).code(200);
      }
    });
  },
  update: function update(request, reply) {
    _models2.default.MerchItem.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (merchItem) {
      merchItem.updateAttributes({
        'ArtistId': request.payload.ArtistId,
        'AlbumReleaseId': request.payload.AlbumReleaseId,
        'title': request.payload.title,
        'shortDescription': request.payload.shortDescription,
        'description': request.payload.description,
        'sku': request.payload.sku,
        'stockQty': request.payload.stockQty,
        'format': request.payload.format,
        'isDisplayed': request.payload.isDisplayed,
        'isFeatured': request.payload.isFeatured
      }).then(function (merchItem) {
        if (merchItem) {
          reply(merchItem).code(200);
        } else {
          reply().code(404);
        }
      });
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.MerchItem.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (merchItem) {
      if (merchItem) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = merchItems;