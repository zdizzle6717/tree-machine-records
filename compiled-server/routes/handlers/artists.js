'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Artist Route Configs
var artists = {
  get: function get(request, reply) {
    _models2.default.Artist.find({
      'where': {
        'param': request.params.param
      },
      'include': [{
        'model': _models2.default.AlbumRelease,
        'include': [{
          'model': _models2.default.File
        }]
      }, {
        'model': _models2.default.BioSection
      }, {
        'model': _models2.default.ContactList
      }, {
        'model': _models2.default.EmbeddableMedia
      }, {
        'model': _models2.default.File,
        'include': {
          'model': _models2.default.Song,
          'include': {
            'model': _models2.default.AlbumRelease,
            'include': {
              'model': _models2.default.File
            }
          }
        }
      }, {
        'model': _models2.default.MediaMention
      }, {
        'model': _models2.default.MerchItem
      }, {
        'model': _models2.default.Origin
      },
      // {
      // 	model: models.FeaturedTrack
      // },
      {
        'model': _models2.default.SocialLinkList
      }]
    }).then(function (artist) {
      if (artist) {
        reply(artist).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getById: function getById(request, reply) {
    _models2.default.Artist.find({
      'where': {
        'id': request.params.id
      },
      'include': [{
        'model': _models2.default.AlbumRelease
      }]
    }).then(function (artist) {
      if (artist) {
        reply(artist).code(200);
      } else {
        reply().code(404);
      }
    });
  },
  getAll: function getAll(request, reply) {
    _models2.default.Artist.findAll({
      'order': 'name',
      'limit': 50,
      'include': [{
        'model': _models2.default.File
      }, {
        'model': _models2.default.Origin
      }]
    }).then(function (artists) {
      reply(artists).code(200);
    });
  },
  search: function search(request, reply) {
    var query = request.payload.searchQuery ? request.payload.searchQuery.toLowerCase() : '';
    var totalPages = 0;
    var offset = (request.payload.pageNumber - 1) * request.payload.pageSize;
    _models2.default.Artist.findAndCountAll({
      'where': {
        '$or': [{
          'name': {
            '$ilike': '%' + query + '%'
          }
        }]
      },
      'include': [{
        'model': _models2.default.BioSection
      }],
      'order': [['name', 'ASC']],
      'offset': offset,
      'limit': request.payload.pageSize
    }).then(function (response) {
      var totalResults = response.count;
      var totalPagesDecimal = totalResults === 0 ? 0 : totalResults / request.payload.pageSize;
      totalPages = Math.ceil(totalPagesDecimal);
      reply({
        'pagination': {
          'pageNumber': request.payload.pageNumber,
          'pageSize': request.payload.pageSize,
          'totalPages': totalPages,
          'totalResults': response.rows.count
        },
        'results': response.rows
      }).code(200);
    });
  },
  create: function create(request, reply) {
    _models2.default.Artist.create({
      'name': request.payload.name,
      'param': request.payload.param,
      'isCurrent': request.payload.isCurrent
    }).then(function (artist) {
      _models2.default.File.create({
        'ArtistId': artist.id,
        'identifier': request.payload.Files[0].identifier,
        'name': request.payload.Files[0].name,
        'size': request.payload.Files[0].size,
        'type': request.payload.Files[0].type
      }).then(function () {
        _models2.default.Artist.find({
          'where': {
            'id': artist.id
          },
          'include': [{
            'model': _models2.default.File
          }]
        }).then(function (artist) {
          reply(artist).code(201);
        });
      });
    });
  },
  update: function update(request, reply) {
    _models2.default.Artist.find({
      'where': {
        'id': request.params.id
      }
    }).then(function (artist) {
      if (artist) {
        artist.updateAttributes({
          'name': request.payload.name,
          'param': request.payload.param,
          'isCurrent': request.payload.isCurrent
        }).then(function (artist) {
          reply(artist).code(200);
        });
      } else {
        reply().code(404);
      }
    });
  },
  delete: function _delete(request, reply) {
    _models2.default.Artist.destroy({
      'where': {
        'id': request.params.id
      }
    }).then(function (artist) {
      if (artist) {
        reply().code(200);
      } else {
        reply().code(404);
      }
    });
  }
};

exports.default = artists;